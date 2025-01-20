"use client";
import Header from "@/components/header/Header";
import MobileHeader from "@/components/header/MobileHeader";
import Heading from "@/components/Heading";
import NavBar from "@/components/NavBar";
import Notifi from "@/components/Notifi";
import React, { useState } from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px]'>
      <Heading title='Thông báo' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='notifications' />
      </div>

      <MobileHeader text='Thông báo' />

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
