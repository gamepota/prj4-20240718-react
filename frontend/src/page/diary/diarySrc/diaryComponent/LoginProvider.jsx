import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [username, setUsername] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  // isLoggedIn
  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  // 권한 있는 지? 확인
  function hasAccess(param) {
    return username === param;
  }

  function isAdmin() {
    return authority.includes("admin");
  }

  // login
  function login(token) {
    localStorage.setItem("access", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setUsername(payload.username);
    setNickName(payload.nickName);
    setAuthority(payload.scope.split(" ")); // "admin manager user"
  }

  // logout
  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setUsername("");
    setNickName("");
    setAuthority([]);
  }

  return (
    <LoginContext.Provider
      value={{
        username: username,
        nickName: nickName,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasAccess: hasAccess,
        isAdmin: isAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
