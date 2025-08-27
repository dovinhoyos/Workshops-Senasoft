import { useState } from "react";
import type { User } from "../types";
import { api } from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    await api<User>("/user/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });
  };

  const login = async (email: string, password: string) => {
    const res = await api<{ token: { token: string } } & User>("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", res.token.token);
    setUser({ id: res.id, fullName: res.fullName, email: res.email });
  };

  const fetchMe = async () => {
    const me = await api<User>("/user/me");
    setUser(me);
  };

  const logout = async () => {
    await api("/user/logout", { method: "POST" });
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, register, login, fetchMe, logout };
}
