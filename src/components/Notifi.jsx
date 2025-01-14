import React, { useState } from "react";

const Notifi = ({ isRead }) => {
  return (
    <div
      className={`flex items-center gap-[20px] cursor-pointer py-[10px] px-[20px] mb-[1px] ${
        isRead ? "bg-[#fff]" : "bg-[#eeeeeeee]"
      }`}
    >
      {isRead ? (
        <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
      ) : (
        <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
      )}

      <div className=''>
        <p className={`line-clamp-2  font-semibold text-[18px] ${isRead ? "text-[#939393]" : "text-[#4A4B4D]"}`}>
          Your order has been delivered
        </p>
        <p className={`text-[14px] ${isRead ? "text-[#939393]" : "text-[#4A4B4D]"}`}>1h ago</p>
      </div>
    </div>
  );
};

export default Notifi;
