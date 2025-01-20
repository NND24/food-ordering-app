"use client";
import Header from "@/components/header/Header";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className='px-[20px] md:pt-[110px] md:pb-[100px]'>
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:overflow-hidden'>
        <div className='flex items-center gap-[30px] pt-[20px] md:hidden'>
          <Image src='/assets/arrow_left.png' alt='' width={30} height={30} />
          <h3 className='flex-1 text-[#4A4B4D] text-[28px] font-bold'>Đánh giá</h3>
        </div>

        <div className='flex flex-col items-center justify-center py-[20px]'>
          <Image src='/assets/shops.png' alt='' width={80} height={80} />
        </div>

        <div className='flex flex-col items-center justify-center py-[20px]'>
          <span className='text-[#4A4B4D] text-[26px] font-semibold text-center'>Đánh giá bữa ăn này</span>
          <span className='text-[#636464] text-[18px] text-center'>
            Bạn thấy món ăn hoặc thức uống từ Phở Gà BMT như thế nào?
          </span>
        </div>

        <div className='flex items-center justify-center py-[20px]'>
          <StarRating />
        </div>

        <div className=' bg-[#e8e9e9] text-[#636464] p-[20px] mt-[30px] mb-[10px] rounded-[8px]'>
          <textarea
            name=''
            id=''
            placeholder='Vui lòng nhập đánh giá của bạn'
            className='bg-[#e8e9e9] w-full'
          ></textarea>
        </div>

        <div className='flex items-center justify-end gap-[10px]'>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/camera.png' alt='' layout='fill' objectFit='contain' className='rounded-[8px]' />
          </div>
          <span className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Thêm ảnh</span>
        </div>

        <div className='relative w-[150px] pt-[150px] mt-[20px] ml-auto'>
          <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-[15px] bg-[#fff] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] md:px-[8px] lg:w-[60%] md:w-[80%] md:mx-auto'>
          <span className='text-[#fff] text-[20px] font-semibold md:text-[16px]'>Đánh giá</span>
        </div>
      </div>
    </div>
  );
};

export default page;
