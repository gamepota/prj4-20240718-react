import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [memberInfo, setMemberInfo] = useState(() => {
    const storedMemberInfo = localStorage.getItem("memberInfo");
    return storedMemberInfo ? JSON.parse(storedMemberInfo) : null;
  });

  // 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (memberInfo) {
      localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
    } else {
      localStorage.removeItem("memberInfo");
    }
  }, [memberInfo]);

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
