import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileHeader = ({ text }) => {
  return (
    <div className='px-[20px] flex items-center justify-between md:hidden'>
      <h3 className='text-[#4A4B4D] text-[28px] font-bold'>{text}</h3>
      <div className='flex items-center gap-[15px]'>
        <Link href='/notifications' className='relative w-[30px] pt-[30px]'>
          <Image src='/assets/notification.png' alt='' layout='fill' objectFit='contain' />
        </Link>

        <Link href='/carts' className='relative w-[30px] pt-[30px]'>
          <Image src='/assets/cart.png' alt='' layout='fill' objectFit='contain' />
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
