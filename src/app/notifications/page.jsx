"use client";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Notifi from "@/components/Notifi";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px]'>
      <div className='hidden md:block'>
        <Header page='notifications' />
      </div>

      <div className='flex items-center justify-between px-[20px] md:hidden'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Thông báo</h3>
      </div>

      <div className='pt-[20px] lg:w-[60%] md:w-[80%] md:mx-auto'>
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

      <div className='md:hidden'>
        <NavBar page='notifications' />
      </div>
    </div>
  );
};

export default page;
