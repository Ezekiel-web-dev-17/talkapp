import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import jwtDecode from "jwt-decode";

export function useAuth() {
  const api = useContext(ApiContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUser(payload);
      } catch {
        localStorage.removeItem("auth-token");
        setUser(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/v1/sign-in", { email, password });
    const { token } = res.data;
    localStorage.setItem("auth-token", token);
    const payload = jwtDecode(token);
    setUser(payload);
    return payload;
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
  };

  return { user, login, logout };
}
