import Image from "next/image";
import React from "react";

const RestaurantSmallCard = () => {
  return (
    <div className='flex gap-[10px] items-start'>
      <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px]'>
        <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
      </div>

      <div className='flex flex-1 items-start justify-between'>
        <div className='flex flex-col'>
          <span className='text-[#4A4B4D] text-[18px] font-semibold line-clamp-1'>Minute by tuk tuk</span>

          <div className='flex items-center gap-[6px]'>
            <span className='text-[#636464] md:text-[14px]'>Cafe</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
            <span className='text-[#636464] md:text-[14px]'>Western food</span>
          </div>

          <div className='flex items-center gap-[6px]'>
            <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
              <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
            </div>
            <span className='text-[#fc6011] md:text-[14px]'>4.9</span>
            <span className='text-[#636464] md:text-[14px]'>{"(124 ratings)"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSmallCard;
