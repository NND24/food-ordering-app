"use client";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  return (
    <div className='md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Quên mật khẩu' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:h-full'>
        <div className='flex flex-col items-center py-[50px] h-screen'>
          <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Quên mật khẩu</h3>
          <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

          <div className='text-[#636464] text-center my-[20px]'>
            <span>Vui lòng nhập email của bạn</span> <br />
            <span>vào ô bên dưới để có thể tạo mật khẩu mới</span> <br />
          </div>

          <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/email.png' alt='' width={25} height={25} />
            <input type='email' name='' id='' placeholder='Nhập email của bạn' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <Link
            href='/auth/confirm-otp'
            className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'
          >
            Gửi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
