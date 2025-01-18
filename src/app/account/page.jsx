import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Tài khoản</h3>
        <Link href='/notifications' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
          <Image src='/assets/notification.png' alt='' layout='fill' objectFit='contain' />
        </Link>
      </div>

      <div className='lg:w-[60%] md:w-[80%] md:mx-auto'>
        <Link href='/profile' className='flex gap-[15px] my-[20px] cursor-pointer'>
          <div className='relative w-[60px] pt-[60px]'>
            <Image src='/assets/cat_offer.png' alt='' layout='fill' objectFit='cover' className='rounded-[6px]' />
          </div>
          <div className='flex flex-1 justify-between items-center'>
            <div className=''>
              <p className='text-[#4A4B4D] text-[22px] font-semibold'>Nguyễn Ngọc Đạt</p>
              <p className='text-[#636464] text-[16px]'>0952369874</p>
            </div>

            <div className='relative w-[30px] pt-[30px]'>
              <Image src='/assets/pencil.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
        </Link>

        <div className='bg-[#fff] flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/notification.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Thông báo</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className='bg-[#fff] flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/favorite.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Yêu thích</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className='bg-[#fff] flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/location.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Địa chỉ</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
        <Link
          href='/all-payment-method'
          className='bg-[#fff] flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
        >
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/credit-card.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Phương thức thanh toán</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </Link>
        <div className='bg-[#fff] flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/setting.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Cài đặt</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>

        <button className='bg-[#fc6011] text-[#fff] font-semibold w-full p-[20px] rounded-full my-[10px] cursor-pointer shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          Đăng Xuất
        </button>
      </div>

      <div className='block md:hidden'>
        <NavBar page='account' />
      </div>
    </div>
  );
};

export default page;
