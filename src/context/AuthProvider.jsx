import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default function AuthProvider(props) {
  const [token, setToken] = useState(() => {
    const storedToken = window.localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : undefined;
  });
  // const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", JSON.stringify(token));
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  function login(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  const value = { token, login, logout };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
