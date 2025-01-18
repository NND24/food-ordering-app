import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantBigCard = () => {
  return (
    <Link href='/restaurant/123'>
      <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
        <Image
          src='/assets/m_res_1.png'
          alt=''
          layout='fill'
          objectFit='cover'
          className='rounded-[6px] justify-center'
        />
      </div>

      <div>
        <h4 className='text-[#4A4B4D] text-[20px] font-semibold py-[4px]'>Minute by tuk tuk</h4>

        <div className='flex items-center gap-[10px]'>
          <div className='flex items-center gap-[6px]'>
            <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
              <Image src='/assets/star-active.png' alt='' layout='fill' objectFit='fill' />
            </div>
            <span className='text-[#fc6011] md:text-[14px]'>4.9</span>
            <span className='text-[#636464] md:text-[14px]'>{"(124 ratings)"}</span>
            <span className='text-[#636464] md:text-[14px]'>Cafe</span>
          </div>

          <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>

          <span className='text-[#636464]'>Western food</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantBigCard;
