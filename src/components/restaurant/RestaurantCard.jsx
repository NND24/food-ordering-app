import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantCard = () => {
  return (
    <Link
      href='/restaurant/123'
      className='flex gap-[25px] items-start h-fit md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:p-[10px]'
    >
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
            <div className='relative w-[20px] pt-[20px]'>
              <Image src='/assets/star-active.png' alt='' layout='fill' objectFit='fill' />
            </div>
            <span className='text-[#fc6011]'>4.9</span>
            <span className='text-[#636464]'>{"(124 ratings)"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
