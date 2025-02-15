"use client";
import Header from "../../../components/header/Header";
import Heading from "../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Đăng ký' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
        <div className='flex flex-col items-center py-[30px] h-screen md:h-full'>
          <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Đăng ký</h3>
          <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />
          <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/account.png' alt='' width={25} height={25} />
            <input type='text' name='' id='' placeholder='Nhập tên' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/email.png' alt='' width={25} height={25} />
            <input type='email' name='' id='' placeholder='Nhập email của bạn' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/phone.png' alt='' width={25} height={25} />
            <input type='text' name='' id='' placeholder='Nhập số điện thoại' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/lock.png' alt='' width={25} height={25} />
            <input
              type={showPass ? "text" : "password"}
              name=''
              id=''
              placeholder='Nhập mật khẩu của bạn'
              className='bg-[#e8e9e9] text-[18px]'
            />
            {showPass ? (
              <Image
                src='/assets/eye_show.png'
                alt=''
                width={25}
                height={25}
                className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <Image
                src='/assets/eye_hide.png'
                alt=''
                width={25}
                height={25}
                className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>

          <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
            <Image src='/assets/lock.png' alt='' width={25} height={25} />
            <input
              type={showPass ? "text" : "password"}
              name=''
              id=''
              placeholder='Nhập lại mật khẩu'
              className='bg-[#e8e9e9] text-[18px]'
            />
            {showPass ? (
              <Image
                src='/assets/eye_show.png'
                alt=''
                width={25}
                height={25}
                className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <Image
                src='/assets/eye_hide.png'
                alt=''
                width={25}
                height={25}
                className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>

          <button className='bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'>
            Đăng ký
          </button>

          <p className='text-[#636464] font-semibold my-[10px]'>
            Đã có tài khoản{" "}
            <Link href='/auth/login' className='text-[#fc6011] cursor-pointer'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
