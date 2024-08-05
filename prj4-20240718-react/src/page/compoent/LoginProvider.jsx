import React from "react";

export function LoginProvider({ children }) {
  return <LoginContext.Provider value={null}>{children}</LoginContext.Provider>;
}
