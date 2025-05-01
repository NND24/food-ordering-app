"use client";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import Notification from "../../components/Notification";
import React, { useEffect, useState } from "react";
import { useUpdateNotificationStatusMutation } from "../../redux/features/notification/notificationApi";
import { useSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";

const page = () => {
  const { socket, notifications, setNotifications } = useSocket();

  const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();

  const userState = useSelector((state) => state?.user);
  const { currentUser } = userState;

  const handleNotificationStatusChange = async (id) => {
    await updateNotificationStatus(id);

    setNotifications((prev) => prev.map((notif) => (notif._id === id ? { ...notif, status: "read" } : notif)));
  };

  const sendNotificationToUser = (userId) => {
    socket.emit("sendNotification", {
      userId: "67ba0ddde145d9ad24039666",
      title: "Bạn có đơn hàng mới!",
      message: "Đơn hàng đã tới chỗ bạn",
      type: "order",
    });
  };

  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px]'>
      <Heading title='Thông báo' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='notifications' />
      </div>

      <MobileHeader page='notifications' />

      <div className='pt-[20px] lg:w-[60%] md:w-[80%] md:mx-auto'>
        {/* <button onClick={() => sendNotificationToUser(currentUser._id)}>Gửi Thông Báo</button> */}
        {notifications &&
          notifications.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
              handleNotificationStatusChange={handleNotificationStatusChange}
            />
          ))}
      </div>

      <div className='md:hidden'>
        <NavBar page='notifications' />
      </div>
    </div>
  );
};

export default page;
