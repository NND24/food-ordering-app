"use client";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className='py-[20px]'>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px]'>
        <Image src='/assets/left-arrow.png' alt='' width={30} height={30} />
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Ưu đãi</h3>
      </div>

      <div className='flex items-center bg-[#e8e9e9] text-[#636464] px-[20px] py-[10px] mb-[20px] mt-[85px] mx-[20px] rounded-[8px] gap-[8px]'>
        <input
          type='text'
          name=''
          id=''
          placeholder='Nhập mã khuyến mãi hoặ mã quà tặng tại đây'
          className='bg-[#e8e9e9] text-[18px] w-full'
        />
      </div>

      <div className='px-[20px]'>
        <div className='flex gap-[15px] items-start py-[15px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
          <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>

          <div className='flex justify-between flex-1'>
            <div className='flex flex-col'>
              <h4 className='text-[#4A4B4D] text-[24px] font-medium pt-[2px] line-clamp-1'>Minute by tuk tuk</h4>
              <p className='text-[#a4a5a8]'>Sợi mì dai ngon</p>
            </div>
            <Image src='/assets/add-active.png' alt='' width={40} height={40} className='object-contain ' />
          </div>
        </div>

        <div className='flex gap-[15px] items-start py-[15px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
          <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>

          <div className='flex justify-between flex-1'>
            <div className='flex flex-col'>
              <h4 className='text-[#4A4B4D] text-[24px] font-medium pt-[2px] line-clamp-1'>Minute by tuk tuk</h4>
              <p className='text-[#a4a5a8]'>Sợi mì dai ngon</p>
            </div>
            <Image
              src='/assets/check-box-circle-active.png'
              alt=''
              width={40}
              height={40}
              className='object-contain '
            />
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] flex items-center justify-between p-[20px]'>
        <h4 className='text-[#4A4B4D] text-[22px] font-bold'>Đã chọn 1 ưu đãi</h4>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px]  shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <span className='text-[#fff] text-[20px] font-semibold'>Áp dụng</span>
        </div>
      </div>
    </div>
  );
};

export default page;
