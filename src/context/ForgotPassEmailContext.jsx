"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

const ForgotPassEmailContext = createContext();

export const ForgotPassEmailProvider = ({ children }) => {
  const pathname = usePathname();
  const [email, setEmail] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("forgotPassEmail") || "" : "";
  });

  useEffect(() => {
    if (email) {
      localStorage.setItem("forgotPassEmail", email);
    } else {
      localStorage.removeItem("forgotPassEmail");
    }
  }, [email]);

  useEffect(() => {
    if (!["/auth/confirm-otp", "/auth/reset-password"].includes(pathname)) {
      setEmail("");
    }
  }, [pathname]);

  return <ForgotPassEmailContext.Provider value={{ email, setEmail }}>{children}</ForgotPassEmailContext.Provider>;
};

export const useForgotPassEmail = () => useContext(ForgotPassEmailContext);
