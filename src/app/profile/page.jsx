"use client";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className='pt-[30px] pb-[100px] px-[20px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Thông tin cá nhân</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <div className='flex flex-col items-center mt-[20px]'>
        <div className='relative w-[110px] pt-[110px] mt-[20px] '>
          <Image
            src='/assets/cat_offer.png'
            alt=''
            layout='fill'
            objectFit='fill'
            className='object-cover rounded-full'
          />
          <Image
            src='/assets/camera.png'
            alt=''
            width={40}
            height={40}
            className='absolute bottom-[-4px] right-[-4px] object-contain z-10 p-[6px] rounded-full bg-[#e8e9e9] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
          />
        </div>
        <div className='py-[10px]'>
          <span className='text-[#fc6011] text-[14px] font-bold'>Chỉnh sửa thông tin</span>
        </div>
        <h3 className='text-[#4A4B4D] text-[26px] font-bold pb-[10px]'>Xin chào Đạt</h3>
      </div>

      <form>
        <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] my-[20px] gap-[8px]'>
          <span className='absolute top-[12px] left-[20px] text-[13px]'>Name</span>
          <input
            type='text'
            name=''
            id=''
            placeholder='Nhập tên'
            className='bg-[#e8e9e9] text-[18px]'
            value='Đạt Nguyễn'
          />
        </div>

        <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] my-[20px] gap-[8px]'>
          <span className='absolute top-[12px] left-[20px] text-[13px]'>Email</span>
          <input type='email' name='' id='' placeholder='Nhập email của bạn' className='bg-[#e8e9e9] text-[18px]' />
        </div>

        <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] my-[20px] gap-[8px]'>
          <span className='absolute top-[12px] left-[20px] text-[13px]'>Số điện thoại</span>
          <input
            type='text'
            name=''
            id=''
            placeholder='Nhập số điện thoại'
            value='0912345678'
            className='bg-[#e8e9e9] text-[18px]'
          />
        </div>

        <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] my-[20px] gap-[8px]'>
          <span className='absolute top-[12px] left-[20px] text-[13px]'>Mật khẩu</span>
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

        <div className='relative flex items-center bg-[#e8e9e9] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] my-[10px] gap-[8px]'>
          <span className='absolute top-[12px] left-[20px] text-[13px]'>Nhập lại mật khẩu</span>
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

        <button className='bg-[#fc6011] text-[#fff] font-semibold w-full p-[20px] rounded-full my-[10px] cursor-pointer shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          Lưu
        </button>
      </form>

      <NavBar page='account' />
    </div>
  );
};

export default page;
