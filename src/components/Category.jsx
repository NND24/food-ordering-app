import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <div className='flex items-center gap-[15px] overflow-x-auto whitespace-nowrap'>
      <Link href='/search' className='relative flex flex-col gap-[4px] min-w-[100px]'>
        <Image
          src='/assets/cat_offer.png'
          alt=''
          width={100}
          height={100}
          className='rounded-full justify-center border-[4px] border-[#fc6011] border-solid'
        />
        <p className='text-[#fc6011] text-[16px] text-center font-semibold'>Hamburger</p>
        <Image
          src='/assets/check-box-circle-active.png'
          alt=''
          width={30}
          height={30}
          className='absolute top-[0px] right-[0px]'
        />
      </Link>
      <div className='relative flex flex-col gap-[4px] min-w-[100px]'>
        <Image
          src='/assets/cat_sri.png'
          alt=''
          width={100}
          height={100}
          className='rounded-full justify-center border-[4px] border-[#e8e9e9] border-solid'
        />
        <p className='text-[#4A4B4D] text-[16px] text-center font-semibold'>Bún</p>
      </div>
      <div className='relative flex flex-col gap-[4px] min-w-[100px]'>
        <Image
          src='/assets/cat_3.png'
          alt=''
          width={100}
          height={100}
          className='rounded-full justify-center border-[4px] border-[#e8e9e9] border-solid'
        />
        <p className='text-[#4A4B4D] text-[16px] text-center font-semibold'>Cơm</p>
      </div>
      <div className='relative flex flex-col gap-[4px] min-w-[100px]'>
        <Image
          src='/assets/cat_4.png'
          alt=''
          width={100}
          height={100}
          className='rounded-full justify-center border-[4px] border-[#e8e9e9] border-solid'
        />
        <p className='text-[#4A4B4D] text-[16px] text-center font-semibold'>Tráng miệng</p>
      </div>
    </div>
  );
};

export default Category;
