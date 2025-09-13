import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
  user: string
  login: (token: string, userData: string) => void
  logout: () => void
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("")

  const login = (token: string, userData: string) => {
    localStorage.setItem("token", token)
    setUser(userData)
  };

  const logout = () => {
    localStorage.removeItem("token")
    setUser("")
  };

  const getToken = () => {
    return localStorage.getItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)!
}
