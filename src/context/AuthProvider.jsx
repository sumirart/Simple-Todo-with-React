import { createContext, useContext, useState, useEffect } from "react";

let AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = window.localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : undefined;
  });

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", JSON.stringify(token));
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
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
