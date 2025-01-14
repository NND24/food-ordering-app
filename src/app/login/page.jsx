"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='flex flex-col items-center justify-between py-[50px] h-screen'>
      <div className='flex flex-col items-center w-full'>
        <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Đăng nhập</h3>
        <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />
        <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
          <Image src='/assets/more_inbox.png' alt='' width={25} height={25} />
          <input type='email' name='' id='' placeholder='Nhập email của bạn' className='bg-[#e8e9e9] text-[18px]' />
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
              src='/assets/show.png'
              alt=''
              width={25}
              height={25}
              className='absolute top-[50%] right-[25px] translate-y-[-50%]'
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <Image
              src='/assets/hide.png'
              alt=''
              width={25}
              height={25}
              className='absolute top-[50%] right-[25px] translate-y-[-50%]'
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>

        <Link
          href='welcome'
          className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'
        >
          Đăng nhập
        </Link>
        <Link href='/forgot-password' className='text-[#636464] font-semibold my-[10px] cursor-pointer'>
          Quên mật khẩu?
        </Link>

        <div className='relative bg-[#636464] h-[1px] w-[80%] mb-[20px] mt-[30px]'>
          <span className='absolute right-[45%] top-[-10px] text-[#636464] font-medium bg-[#fff]'>Hoặc</span>
        </div>

        <div className='flex items-center justify-center bg-[#347EC0] text-[#fff] w-[80%] p-[20px] rounded-full my-[10px] gap-[10px] cursor-pointer'>
          <Image src='/assets/facebook_logo.png' alt='' width={10} height={10} />
          <button className=''>Đăng nhập bằng Facebook</button>
        </div>

        <div className='flex items-center justify-center bg-[#dd4938] text-[#fff] w-[80%] p-[20px] rounded-full my-[10px] gap-[10px] cursor-pointer'>
          <Image src='/assets/google_logo.png' alt='' width={25} height={25} />
          <button className=''>Đăng nhập bằng Facebook</button>
        </div>
      </div>

      <p className='text-[#636464] font-semibold mt-[20px]'>
        Chưa có mật khẩu?{" "}
        <Link href='/register' className='text-[#fc6011] cursor-pointer'>
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default page;
