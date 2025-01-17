"use client";
import Category from "@/components/category/CategorySlider";
import Image from "next/image";
import React, { useState } from "react";
import FilterBy from "@/components/filter/FilterBy";
import RestaurantOptions from "@/components/filter/RestaurantOptions";
import DeliveryFee from "@/components/filter/DeliveryFee";
import FilterPrice from "@/components/filter/FilterPrice";

const page = () => {
  const [openFilter, setOpenFilter] = useState(null);

  return (
    <>
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
        <div className='pt-[270px]'>
          <div className='fixed top-0 right-0 left-0 bg-[#fff] px-[20px] z-10'>
            <div className='flex items-center gap-[20px]'>
              <Image src='/assets/left-arrow.png' alt='' width={25} height={25} />
              <div className='flex items-center bg-[#e8e9e9] text-[#636464] px-[20px] py-[10px] mt-[20px] mb-[15px] rounded-[8px] gap-[8px] w-full'>
                <Image src='/assets/search.png' alt='' width={25} height={25} />
                <input type='text' name='' id='' placeholder='Tìm kiếm đồ ăn' className='bg-[#e8e9e9] text-[18px]' />
              </div>
            </div>

            <Category />

            <div className='flex items-center gap-[15px] overflow-x-auto whitespace-nowrap my-[15px]'>
              <div
                className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] z-10'
                onClick={() => setOpenFilter("All Filter")}
              >
                <div className='relative w-[25px] pt-[25px]'>
                  <Image src='/assets/filter.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <div className='bg-[#fc6011] w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                  <span className='text-[#fff] text-[18px]'>1</span>
                </div>
              </div>
              <div
                className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px]'
                onClick={() => setOpenFilter("Filter By")}
              >
                <div className='relative w-[25px] pt-[25px]'>
                  <Image src='/assets/up-arrow.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#4A4B4D] text-[18px]'>Lọc theo</span>
              </div>
              <div
                className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px]'
                onClick={() => setOpenFilter("Restaurant Options")}
              >
                <div className='relative w-[25px] pt-[25px]'>
                  <Image src='/assets/promotion.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#4A4B4D] text-[18px]'>Khuyến mãi</span>
              </div>
              <div
                className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px]'
                onClick={() => setOpenFilter("Delivery Fee")}
              >
                <div className='relative w-[25px] pt-[25px]'>
                  <Image src='/assets/delivery.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#4A4B4D] text-[18px]'>Phí giao hàng</span>
              </div>
              <div
                className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px]'
                onClick={() => setOpenFilter("Filter Price")}
              >
                <div className='relative w-[25px] pt-[25px]'>
                  <Image src='/assets/dollar.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#4A4B4D] text-[18px]'>Giá</span>
              </div>
              <span className='text-[#0054ff] text-[18px] font-semibold'>Làm mới</span>
            </div>
          </div>

          <div className='px-[20px]'>
            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-[20px] my-[20px] items-start'>
              <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
                <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

                  <div className='flex items-center gap-[10px]'>
                    <span className='text-[#636464]'>Cafe</span>
                    <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    <span className='text-[#636464]'>Western food</span>
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                    <span className='text-[#fc6011]'>4.9</span>
                    <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
