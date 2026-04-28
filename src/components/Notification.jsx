import moment from "moment";
import React from "react";

const Notification = ({ notification, handleNotificationStatusChange }) => {
  return (
    <div
      onClick={() => {
        handleNotificationStatusChange(notification._id);
      }}
      className={`flex items-center gap-[20px] cursor-pointer py-[10px] px-[20px] mb-[1px] rounded-md transition-colors ${
        notification.status === "read"
          ? "bg-[#fff] dark:bg-gray-800/70 hover:bg-gray-50 dark:hover:bg-gray-800"
          : "bg-[#eeeeeeee] dark:bg-gray-700/70 hover:bg-[#e5e5e5] dark:hover:bg-gray-700"
      }`}
    >
      {notification.status === "read" ? (
        <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-500'></div>
      ) : (
        <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
      )}

      <div className=''>
        <p
          className={`line-clamp-1 font-medium text-[16px] ${
            notification.status === "read"
              ? "text-[#939393] dark:text-gray-400"
              : "text-black dark:text-gray-100"
          }`}
        >
          {notification.title}
        </p>
        <p
          className={`line-clamp-2 text-[14px] ${
            notification.status === "read"
              ? "text-[#939393] dark:text-gray-400"
              : "text-[#4a4b4d] dark:text-gray-200"
          }`}
        >
          {notification.message}
        </p>
        <p
          className={`text-[12px] ${
            notification.status === "read"
              ? "text-[#939393] dark:text-gray-500"
              : "text-[#4A4B4D] dark:text-gray-300"
          }`}
        >
          {moment(notification?.createdAt).format("DD/MM/YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default Notification;
