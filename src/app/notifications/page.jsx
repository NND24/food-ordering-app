"use client";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import Notification from "../../components/Notification";
import React from "react";
import { useUpdateNotificationStatusMutation } from "../../redux/features/notification/notificationApi";
import { useSocket } from "../../context/SocketContext";

const page = () => {
  const { notifications, setNotifications } = useSocket();

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();

  const handleNotificationStatusChange = async (id) => {
    await updateNotificationStatus(id);
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, status: "read" } : n)));
  };

  const sortedNotifications = notifications
    ? [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300'>
      <Heading title='Thông báo' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='notifications' />
      </div>

      <MobileHeader page='notifications' />

      <div className='pt-[20px] lg:w-[60%] md:w-[80%] md:mx-auto px-[20px] md:px-0'>
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
              handleNotificationStatusChange={handleNotificationStatusChange}
            />
          ))
        ) : (
          <div className='flex flex-col items-center text-center py-10'>
            <h3 className='text-2xl font-bold text-gray-700 dark:text-gray-100'>Không có thông báo nào</h3>
            <p className='text-gray-500 dark:text-gray-400 mt-2'>Bạn chưa có thông báo mới.</p>
          </div>
        )}
      </div>

      <div className='md:hidden'>
        <NavBar page='notifications' />
      </div>
    </div>
  );
};

export default page;
