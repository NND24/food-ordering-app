"use client";
import NavBar from "@/components/NavBar";
import Notifi from "@/components/Notifi";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px]'>
      <div className='flex items-center justify-between px-[20px]'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Thông báo</h3>
      </div>

      <div className='pt-[20px]'>
        <Notifi isRead={true} />
        <Notifi isRead={true} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={true} />
        <Notifi isRead={true} />
        <Notifi isRead={true} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
        <Notifi isRead={false} />
      </div>

      <NavBar />
    </div>
  );
};

export default page;
