import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [memberInfo, setMemberInfo] = useState(null);

  // // isLoggedIn
  // function isLoggedIn() {
  //   return userInfo && userInfo.access !== null;
  // }

  //
  // // 권한 있는 지? 확인
  // function hasAccess(param) {
  //   return username == param;
  // }
  //
  // function isAdmin() {
  //   return authority.includes("admin");
  // }
  //
  // // login
  // function login(access) {
  //   try {
  //     localStorage.setItem("access", access);
  //     const payload = jwtDecode(access);
  //     setUsername(payload.sub);
  //     setNickname(payload.nickname || "");
  //     setExpiration(payload.exp);
  //     setAuthority(payload.scope ? payload.scope.split(" ") : []); // "admin manager user"
  //   } catch (error) {
  //     console.error("토큰 디코딩 실패: ", error);
  //     logout();
  //   }
  // }
  //
  // // logout
  // function logout() {
  //   axios
  //     .post("/api/member/logout", {}, { withCredentials: true })
  //     .then(() => {
  //       localStorage.removeItem("access");
  //       setExpiration(0);
  //       setUsername("");
  //       setNickname("");
  //       setAuthority([]);
  //     })
  //     .catch((error) => {
  //       console.error("로그아웃 실패:", error);
  //     });
  // }

  return (
    <LoginContext.Provider
      value={{
        memberInfo: memberInfo,
        setMemberInfo: setMemberInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
