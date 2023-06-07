import { createContext, useContext, useState } from "react";

let AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(undefined);
    localStorage.removeItem("token");
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default AuthProvider;
