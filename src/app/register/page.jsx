"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='flex flex-col items-center py-[30px] h-screen'>
      <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Đăng ký</h3>
      <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />
      <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
        <Image src='/assets/user.png' alt='' width={25} height={25} />
        <input type='text' name='' id='' placeholder='Nhập tên' className='bg-[#e8e9e9] text-[18px]' />
      </div>

      <div className='flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
        <Image src='/assets/more_inbox.png' alt='' width={25} height={25} />
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

      <button className='bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'>
        Đăng ký
      </button>

      <p className='text-[#636464] font-semibold my-[10px]'>
        Đã có tài khoản{" "}
        <Link href='/login' className='text-[#fc6011] cursor-pointer'>
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default page;
