import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[85px] pb-[140px]'>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px]'>
        <Image src='/assets/left-arrow.png' alt='' width={30} height={30} />
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Thêm thẻ</h3>
      </div>

      <form className='px-[20px]'>
        <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full my-[20px]'>
          <input type='text' name='' id='' placeholder='Nhập số thẻ' className='bg-[#e8e9e9] text-[18px]' />
        </div>

        <div className='flex items-center justify-between gap-[20px]'>
          <span className='text-[#4A4B4D] text-[18px] font-bold'>Hạn</span>
          <div className='bg-[#e8e9e9] text-[#636464] p-[20px] rounded-full my-[20px] w-full'>
            <input
              type='number'
              name=''
              id=''
              placeholder='MM'
              className='bg-[#e8e9e9] text-[18px] w-full text-center'
            />
          </div>
          <div className='bg-[#e8e9e9] text-[#636464] p-[20px] rounded-full my-[20px] w-full'>
            <input
              type='number'
              name=''
              id=''
              placeholder='YY'
              className='bg-[#e8e9e9] text-[18px] w-full text-center'
            />
          </div>
        </div>

        <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full my-[20px]'>
          <input type='text' name='' id='' placeholder='Nhập Security Code' className='bg-[#e8e9e9] text-[18px]' />
        </div>

        <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full my-[20px]'>
          <input type='text' name='' id='' placeholder='First Name' className='bg-[#e8e9e9] text-[18px]' />
        </div>

        <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full my-[20px]'>
          <input type='text' name='' id='' placeholder='Last Name' className='bg-[#e8e9e9] text-[18px]' />
        </div>
      </form>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] m-[20px] w-[90%]'>
          <span className='text-[#fff] text-[20px] font-semibold'>Thêm thẻ</span>
        </div>
      </div>
    </div>
  );
};

export default page;
