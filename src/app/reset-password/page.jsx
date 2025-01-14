"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='flex flex-col items-center py-[50px] h-screen'>
      <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Mật khẩu mới</h3>
      <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

      <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-[80%] p-[20px] rounded-full my-[10px] gap-[8px]'>
        <Image src='/assets/lock.png' alt='' width={25} height={25} />
        <input
          type={showPass ? "text" : "password"}
          name=''
          id=''
          placeholder='Nhập mật khẩu mới'
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

      <Link
        href='/confirm-otp'
        className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'
      >
        Tiếp
      </Link>
    </div>
  );
};

export default page;
