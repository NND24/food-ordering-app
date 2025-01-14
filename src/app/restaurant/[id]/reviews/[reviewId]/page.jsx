"use client";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className='px-[20px]'>
      <div className='flex items-center gap-[30px] pt-[20px]'>
        <Image src='/assets/arrow-left.png' alt='' width={30} height={30} />
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
        <textarea name='' id='' placeholder='Vui lòng nhập đánh giá của bạn' className='bg-[#e8e9e9] w-full'></textarea>
      </div>

      <div className='flex items-center justify-end gap-[10px]'>
        <Image src='/assets/camera.png' alt='' width={30} height={30} />
        <span className='text-[#4A4B4D] text-[20px] font-bold'>Thêm ảnh</span>
      </div>

      <div className='relative w-full pt-[45%] mt-[20px] '>
        <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='fill' className='rounded-[8px]' />
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] m-[20px] w-[90%]'>
          <span className='text-[#fff] text-[20px] font-semibold'>Đánh giá</span>
        </div>
      </div>
    </div>
  );
};

export default page;
