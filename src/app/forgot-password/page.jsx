"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  return (
    <div className='flex flex-col items-center py-[50px] h-screen'>
      <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Quên mật khẩu</h3>
      <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

      <div className='text-[#636464] text-center my-[20px]'>
        <span>Vui lòng nhập email của bạn</span> <br />
        <span>vào ô bên dưới để có thể tạo mật khẩu mới</span> <br />
      </div>

      <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
        <Image src='/assets/more_inbox.png' alt='' width={25} height={25} />
        <input type='email' name='' id='' placeholder='Nhập email của bạn' className='bg-[#e8e9e9] text-[18px]' />
      </div>

      <Link
        href='/confirm-otp'
        className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'
      >
        Gửi
      </Link>
    </div>
  );
};

export default page;
