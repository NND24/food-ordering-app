"use client";
import Header from "../../../components/header/Header";
import Heading from "../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [home, setHome] = useState(true);
  const [company, setCompany] = useState(false);

  return (
    <div className='pt-[85px] pb-[200px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Địa chỉ đã lưu' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static'>
          <Link href='/account' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Địa chỉ đã lưu</h3>
        </div>

        <div className='py-[20px]'>
          {home ? (
            <Link
              href='/account/location/add-location'
              className='flex items-center gap-[15px] mb-[20px] cursor-pointer px-[20px]'
            >
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full h-fit'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/home_green.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex flex-col mr-[10px]'>
                  <h3 className='text-[#4a4b4d] text-[20px] font-bold'>Nhà</h3>
                  <div className='flex items-center gap-[4px]'>
                    <span className='text-[#a4a5a8] text-[15px]'>0km</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                    <span className='text-[#a4a5a8] text-[15px] line-clamp-1'>
                      Thành phố Buôn Ma Thuột, tỉnh Đak Lak
                    </span>
                  </div>
                </div>
                <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
            </Link>
          ) : (
            <Link href='/account/location/add-location' className='flex gap-[15px] mb-[20px] cursor-pointer'>
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full h-fit'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px] '>
                  <Image src='/assets/add_home.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex items-center gap-[8px]'>
                  <h3 className='text-[#0054ff] text-[20px] font-bold'>Thêm nhà</h3>
                </div>
              </div>
            </Link>
          )}

          {company ? (
            <Link
              href='/account/location/add-location'
              className='flex items-center gap-[15px] mb-[20px] cursor-pointer px-[20px]'
            >
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full h-fit'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/briefcase_green.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex flex-col mr-[10px]'>
                  <h3 className='text-[#4a4b4d] text-[20px] font-bold'>Công ty</h3>
                  <div className='flex items-center gap-[4px]'>
                    <span className='text-[#a4a5a8] text-[15px]'>0km</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                    <span className='text-[#a4a5a8] text-[15px] line-clamp-1'>
                      Thành phố Buôn Ma Thuột, tỉnh Đak Lak
                    </span>
                  </div>
                </div>
                <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
            </Link>
          ) : (
            <Link href='/account/location/add-location' className='flex gap-[15px] mb-[20px] cursor-pointer px-[20px]'>
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/briefcase.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex items-center gap-[8px]'>
                  <h3 className='text-[#0054ff] text-[20px] font-bold'>Thêm công ty</h3>
                </div>
              </div>
            </Link>
          )}

          <div className='pt-[20px]' style={{ borderTop: "6px solid #e0e0e0a3" }}>
            <Link
              href='/account/location/add-location'
              className='flex items-center gap-[15px] mb-[20px] cursor-pointer px-[20px]'
            >
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full h-fit'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/favorite-active.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex flex-col mr-[10px]'>
                  <h3 className='text-[#4a4b4d] text-[20px] font-bold'>Nhà 2</h3>
                  <div className='flex items-center gap-[4px]'>
                    <span className='text-[#a4a5a8] text-[15px]'>0.5km</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                    <span className='text-[#a4a5a8] text-[15px] line-clamp-1'>
                      Thành phố Buôn Ma Thuột, tỉnh Đak Lak
                    </span>
                  </div>
                </div>
                <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
            </Link>

            <Link
              href='/account/location/add-location'
              className='flex items-center gap-[15px] mb-[20px] cursor-pointer px-[20px]'
            >
              <div className='p-[8px] bg-[#e0e0e0a3] rounded-full h-fit'>
                <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/plus.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex flex-col mr-[10px]'>
                  <h3 className='text-[#4a4b4d] text-[20px] font-bold'>Thêm mới</h3>
                  <div className='flex items-center gap-[4px]'>
                    <span className='text-[#a4a5a8] text-[15px]'>Lưu làm địa chỉ thân quen</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
