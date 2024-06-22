import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [memberInfo, setMemberInfo] = useState(null);
  
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
