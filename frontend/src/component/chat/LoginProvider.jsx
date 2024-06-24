import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [expired, setExpired] = useState(0);
  const [authority, setAuthority] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const storedNickname = localStorage.getItem("nickname");
    if (token && storedNickname) {
      const payload = jwtDecode(token);
      setExpired(payload.exp);
      setUsername(payload.username);
      setAuthority(payload.scope ? payload.scope.split(" ") : []);
      setNickname(storedNickname);
    }
  }, []);

  // 로그인 상태 확인
  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  // 특정 권한이 있는지 확인
  function hasAccess(requiredAuthority) {
    return authority.includes(requiredAuthority);
  }

  // 관리자 권한 확인
  function isAdmin() {
    return hasAccess("admin");
  }

  // 로그인 처리
  function login(token, nickname) {
    try {
      localStorage.setItem("access", token);
      localStorage.setItem("nickname", nickname);
      const payload = jwtDecode(token);
      setExpired(payload.exp);
      setUsername(payload.username);
      setAuthority(payload.scope ? payload.scope.split(" ") : []);
      setNickname(nickname);

      console.log("Logged in as:", nickname); // 로그 추가
    } catch (error) {
      console.error("Invalid token", error);
      logout();
    }
  }

  // 로그아웃 처리
  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("nickname");
    setExpired(0);
    setUsername("");
    setNickname("");
    setAuthority([]);
  }

  console.log("LoginContext Provider Value:", {
    username,
    nickname,
    login,
    logout,
    isLoggedIn,
    hasAccess,
    isAdmin,
  }); // 로그 추가

  return (
    <LoginContext.Provider
      value={{
        username,
        nickname,
        login,
        logout,
        isLoggedIn,
        hasAccess,
        isAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
