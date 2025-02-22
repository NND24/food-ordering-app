"use client";
import { useRouter } from "next/navigation";
import useUserAuth from "./useUserAuth";
import { useEffect } from "react";

export default function Protected({ children }) {
  const router = useRouter();
  const isAuthenticated = useUserAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) return null;

  return children;
}
