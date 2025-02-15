"use client";
import Link from "next/link";
import Header from "../../../../../../components/header/Header";
import Heading from "../../../../../../components/Heading";
import React, { useState } from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className='pt-[85px] pb-[90px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Chỉnh sửa địa điểm' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div
          className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static'
          style={{ borderBottom: "6px solid #e0e0e0a3" }}
        >
          <Link href='/restaurant/123/cart/321' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Chỉnh sửa địa điểm</h3>
        </div>

        <form>
          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[12px] left-[20px]'>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Tên</span>
            </div>
            <input type='text' name='' id='' placeholder='' className='bg-[#fff] text-[18px] md:text-[14px]' />
          </div>

          <Link
            href='/restaurant/123/cart/321/location/add-location/choose-location'
            className='relative flex items-center justify-between gap-[10px] bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex-1 line-clamp-1'>
              <div className='flex absolute top-[12px] left-[20px]'>
                <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
                <span className='text-[14px] md:text-[12px] text-[#000]'>Địa chỉ</span>
              </div>
              <input
                type='text'
                name=''
                id=''
                placeholder=''
                readOnly
                className='bg-[#fff] text-[18px] md:text-[14px] w-full'
              />
            </div>
            <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </Link>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[12px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Địa chỉ chi tiết</span>
            </div>
            <input
              type='text'
              name=''
              id=''
              placeholder='Vd: tên toàn nhà / địa điểm gần đó'
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[12px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Ghi chú cho tài xế</span>
            </div>
            <input
              type='text'
              name=''
              id=''
              placeholder='Chỉ dẫn chi tiết địa điểm cho tài xế'
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[12px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Tên người liên lạc</span>
            </div>
            <input type='text' name='' id='' placeholder='' className='bg-[#fff] text-[18px] md:text-[14px] w-full' />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[28px] pb-[12px] rounded-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[12px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Số điện thoại liên lạc</span>
            </div>
            <input type='text' name='' id='' placeholder='' className='bg-[#fff] text-[18px] md:text-[14px] w-full' />
          </div>

          <div className='flex items-center justify-between gap-[10px] p-[20px]'>
            <div className='flex flex-col'>
              <span className='text-[18px] text-[#4a4b4d] font-bold'>Thêm vào Địa điểm đã lưu</span>
              <span className='text-[15px] text-[#a4a5a8]'>Lưu nơi này cho các đơn đặt hàng cho tương lai</span>
            </div>

            <div className='relative w-[25px] pt-[25px]'>
              <Image src='/assets/favorite.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
        </form>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100] flex items-center gap-[10px]'>
        <button className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] w-full'>
          <span className='text-[#fff] text-[20px] font-semibold'>Xóa</span>
        </button>
        <button className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] w-full'>
          <span className='text-[#fff] text-[20px] font-semibold'>Lưu</span>
        </button>
      </div>
    </div>
  );
};

export default page;
