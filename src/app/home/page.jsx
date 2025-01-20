"use client";
import React from "react";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import CategorySlider from "@/components/category/CategorySlider";
import Link from "next/link";
import Header from "@/components/header/Header";
import RestaurantBigSlider from "@/components/restaurant/RestaurantBigSlider";
import Hero from "@/components/hero/Hero";
import RestaurantSlider from "@/components/restaurant/RestaurantSlider";
import Heading from "@/components/Heading";

const page = () => {
  return (
    <div className='pt-[180px] pb-[100px] md:pt-[75px]'>
      <Heading title='Trang chủ' description='' keywords='' />
      <Header />
      <Hero />

      <div className='md:w-[90%] md:mx-auto'>
        <div className='px-[20px] pt-[20px] md:px-0'>
          <CategorySlider />
        </div>

        <div className='my-[20px] md:hidden'>
          <div className='flex items-center justify-between px-[20px] md:px-0 md:mb-[10px]'>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Các nhà hàng nổi tiếng</h3>
            <Link href='/search' className='text-[#fc6011] text-[16px]'>
              Xem tất cả
            </Link>
          </div>

          <div className=''>
            <Link href='/restaurant/123' className='my-[20px]'>
              <div className='relative w-full pt-[45%]'>
                <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='fill' />
              </div>

              <h4 className='text-[#4A4B4D] text-[20px] font-semibold px-[20px] py-[4px]'>Minute by tuk tuk</h4>

              <div className='flex items-center gap-[10px] px-[20px]'>
                <div className='flex items-center gap-[6px]'>
                  <Image src='/assets/star_active.png' alt='' width={20} height={20} />
                  <span className='text-[#fc6011]'>4.9</span>
                  <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  <span className='text-[#636464]'>Cafe</span>
                </div>

                <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>

                <span className='text-[#636464]'>Western food</span>
              </div>
            </Link>
          </div>
        </div>

        <div className='my-[20px] px-[20px] md:px-0'>
          <div className='flex items-center justify-between mb-[10px]'>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Phổ biến nhất</h3>
            <Link href='' className='text-[#fc6011] text-[16px]'>
              Xem tất cả
            </Link>
          </div>

          <RestaurantBigSlider />
        </div>

        <div className='my-[20px] px-[20px] md:px-0'>
          <div className='flex items-center justify-between mb-[10px]'>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Quán cơm</h3>
            <Link href='/search' className='text-[#fc6011] text-[16px]'>
              Xem tất cả
            </Link>
          </div>

          <RestaurantSlider reverse={true} />
          <RestaurantSlider reverse={false} />
        </div>
      </div>

      <div className='md:hidden'>
        <NavBar page='home' />
      </div>
    </div>
  );
};

export default page;
