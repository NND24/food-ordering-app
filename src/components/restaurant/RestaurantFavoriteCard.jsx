import Image from "next/image";
import React from "react";

const RestaurantFavoriteCard = () => {
  return (
    <div className='relative flex gap-[20px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:flex-col md:gap-0'>
      <div className='relative flex flex-col gap-[4px] w-[90px] pt-[90px]  md:w-full md:pt-[45%]'>
        <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[6px]' />
      </div>

      <div className='flex flex-1 items-center justify-between md:p-[10px]'>
        <div className='flex flex-col'>
          <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

          <div className='flex items-center gap-[10px]'>
            <span className='text-[#636464]'>Cafe</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
            <span className='text-[#636464]'>Western food</span>
          </div>

          <div className='flex items-center gap-[6px]'>
            <div className='relative w-[20px] pt-[20px]'>
              <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[#fc6011]'>4.9</span>
            <span className='text-[#636464]'>{"(124 ratings)"}</span>
          </div>
        </div>

        <div className='absolute top-[10px] right-[10px] z-10 p-[8px] rounded-full bg-[#e7e7e7c4] hover:bg-[#e7e7e7e8]'>
          <div className='relative w-[30px] pt-[30px] md:w-[24px] md:pt-[24px]'>
            <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFavoriteCard;
