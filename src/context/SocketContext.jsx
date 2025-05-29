"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URI || "";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const userState = useSelector((state) => state?.user);
  const { currentUser } = userState;

  useEffect(() => {
    if (!currentUser) return;

    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);

    // Đăng ký userId với server
    newSocket.emit("registerUser", currentUser._id);

    // Nhận danh sách thông báo cũ khi kết nối
    newSocket.on("getAllNotifications", (allNotifications) => {
      setNotifications(allNotifications);
    });

    // Nhận thông báo mới
    newSocket.on("newNotification", (newNotification) => {
      setNotifications((prev) => [...prev, newNotification]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
