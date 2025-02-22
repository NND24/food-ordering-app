import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUserAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    setIsAuthenticated(Boolean(currentUser && userId && token));
  }, [currentUser]);

  return isAuthenticated;
}
