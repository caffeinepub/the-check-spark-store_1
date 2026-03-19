import { useEffect, useState } from "react";

const ADMIN_AUTH_KEY = "chic_spark_admin_auth";
const ADMIN_PASSWORD = "ChicSpark2024";

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  });

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
