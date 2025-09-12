import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const ctx = useAuth();
  const token = ctx.getToken()
  return token ? children : <Navigate to="/login" />;
}
