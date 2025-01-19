"use client";
import Category from "@/components/category/CategorySlider";
import Image from "next/image";
import React, { useState } from "react";
import FilterBy from "@/components/filter/FilterBy";
import RestaurantOptions from "@/components/filter/RestaurantOptions";
import DeliveryFee from "@/components/filter/DeliveryFee";
import FilterPrice from "@/components/filter/FilterPrice";
import Header from "@/components/header/Header";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantBigCard from "@/components/restaurant/RestaurantBigCard";
import RestaurantSmallCard from "@/components/restaurant/RestaurantSmallCard";
import Pagination from "@/components/Pagination";
import Heading from "@/components/Heading";

const page = () => {
  const [openFilter, setOpenFilter] = useState(null);

  return (
    <>
      <Heading title='Tìm kiếm' description='' keywords='' />
      {openFilter ? (
        <div className='pb-[160px] pt-[85px]'>
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[20px] bg-[#fff] h-[85px] px-[20px]'>
            <Image src='/assets/close.png' alt='' width={25} height={25} onClick={() => setOpenFilter(null)} />
          </div>

          {openFilter === "All Filter" ? (
            <>
              <FilterBy />
              <RestaurantOptions />
              <DeliveryFee />
              <FilterPrice />
            </>
          ) : openFilter === "Filter By" ? (
            <FilterBy />
          ) : openFilter === "Restaurant Options" ? (
            <RestaurantOptions />
          ) : openFilter === "Delivery Fee" ? (
            <DeliveryFee />
          ) : (
            <FilterPrice />
          )}

          <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] px-[20px] py-[15px] m-[20px] w-[90%]'>
              <span className='text-[#fff] text-[20px] font-semibold'>Áp dụng</span>
            </div>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fff] px-[20px] py-[15px] m-[20px] w-[90%] border border-[#a3a3a3a3] border-solid'>
              <span className='text-[#fc6011] text-[20px] font-semibold'>Làm mới</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='pt-[180px] px-[20px] md:pt-[75px] md:w-[90%] md:mx-auto md:px-0'>
          <Header />

          <div className='flex items-center gap-[20px] fixed top-0 right-0 left-0 bg-[#fff] px-[20px] z-10 md:hidden'>
            <Image src='/assets/left-arrow.png' alt='' width={25} height={25} />
            <div className='flex items-center bg-[#e8e9e9] text-[#636464] px-[20px] py-[10px] mt-[20px] mb-[15px] rounded-[8px] gap-[8px] w-full'>
              <Image src='/assets/search.png' alt='' width={25} height={25} />
              <input type='text' name='' id='' placeholder='Tìm kiếm đồ ăn' className='bg-[#e8e9e9] text-[18px]' />
            </div>
          </div>

          <div className='py-[20px]'>
            <Category />

            <div className='grid grid-cols-12 gap-[35px] md:mt-[20px]'>
              <div className='xl:col-span-9 lg:col-span-8 md:col-span-8 col-span-12'>
                <div className='block md:hidden'>
                  <div className='flex items-center gap-[15px] overflow-x-auto whitespace-nowrap my-[15px]'>
                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] z-10 cursor-pointer'
                      onClick={() => setOpenFilter("All Filter")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/filter.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <div className='bg-[#fc6011] w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                        <span className='text-[#fff] text-[18px] md:text-[16px]'>1</span>
                      </div>
                    </div>

                    <div
                      className='relative flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Filter By")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/up-arrow.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Lọc theo</span>
                    </div>

                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Restaurant Options")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/promotion.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Khuyến mãi</span>
                    </div>
                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Delivery Fee")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/delivery.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Phí giao hàng</span>
                    </div>
                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Filter Price")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/dollar.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Giá</span>
                    </div>
                    <span className='text-[#0054ff] text-[18px] md:text-[16px] font-semibold cursor-pointer'>
                      Làm mới
                    </span>
                  </div>
                </div>

                <div className='hidden md:block z-0'>
                  <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-[20px]'>
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                    <RestaurantBigCard />
                  </div>
                </div>
              </div>

              <div className='xl:col-span-3 lg:col-span-4 md:col-span-4 hidden md:block'>
                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <FilterBy />
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <RestaurantOptions />
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <DeliveryFee />
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <FilterPrice />
                </div>

                {/* <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <h3 className='text-[#4A4B4D] text-[20px] bg-[#e8e9e9] text-center px-4 py-3 font-semibold'>
                    Quán ăn nổi bật
                  </h3>
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[240px] overflow-auto small-scrollbar'>
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                  </ul>
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <h3 className='text-[#4A4B4D] text-[20px] bg-[#e8e9e9] text-center px-4 py-3 font-semibold'>
                    Quán ăn gần nhà bạn
                  </h3>
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[240px] overflow-auto small-scrollbar'>
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                    <RestaurantSmallCard />
                  </ul>
                </div> */}
              </div>
            </div>

            <div className='block md:hidden'>
              <RestaurantCard />
            </div>

            <Pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
