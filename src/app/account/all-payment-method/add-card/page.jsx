import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[85px] pb-[140px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Thêm thẻ' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static'>
          <Link href='/account/all-payment-method' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/left-arrow.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Thêm thẻ</h3>
        </div>

        <form className='px-[20px] flex flex-col gap-[20px] md:gap-[15px]'>
          <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full md:py-[15px]'>
            <input type='text' name='' id='' placeholder='Nhập số thẻ' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='flex items-center justify-between gap-[20px]'>
            <span className='text-[#4A4B4D] text-[18px] font-bold'>Hạn</span>
            <div className='bg-[#e8e9e9] text-[#636464] p-[20px] rounded-full md:py-[15px] w-full'>
              <input
                type='number'
                name=''
                id=''
                placeholder='MM'
                className='bg-[#e8e9e9] text-[18px] w-full text-center'
              />
            </div>
            <div className='bg-[#e8e9e9] text-[#636464] p-[20px] rounded-full md:py-[15px] w-full'>
              <input
                type='number'
                name=''
                id=''
                placeholder='YY'
                className='bg-[#e8e9e9] text-[18px] w-full text-center'
              />
            </div>
          </div>

          <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full md:py-[15px]'>
            <input type='text' name='' id='' placeholder='Nhập Security Code' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full md:py-[15px]'>
            <input type='text' name='' id='' placeholder='First Name' className='bg-[#e8e9e9] text-[18px]' />
          </div>

          <div className='bg-[#e8e9e9] text-[#636464] w-full p-[20px] rounded-full md:py-[15px]'>
            <input type='text' name='' id='' placeholder='Last Name' className='bg-[#e8e9e9] text-[18px]' />
          </div>
        </form>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] p-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] md:py-[10px] lg:w-[60%] md:w-[80%] md:mx-auto'>
          <span className='text-[#fff] text-[20px] font-semibold md:text-[18px]'>Thêm thẻ</span>
        </div>
      </div>
    </div>
  );
};

export default page;
