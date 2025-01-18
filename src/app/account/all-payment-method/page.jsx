import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[85px] pb-[200px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static'>
          <Link href='/account' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/left-arrow.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Tất cả phương thức thanh toán</h3>
        </div>

        <div className='p-[20px]'>
          {/* <div className='flex gap-[15px] mb-[20px]'>
            <Image src='/assets/money.png' alt='' width={30} height={30} />
            <div className='flex flex-1 items-center justify-between'>
              <div className='flex items-center gap-[8px]'>
                <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Tiền mặt</h3>
              </div>
              <Image src='/assets/button-active.png' alt='' width={30} height={30} />
            </div>
          </div> */}

          <Link href='/all-payment-method/add-card' className='flex gap-[15px] mb-[20px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/credit-card.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <div className='flex flex-1 items-center justify-between'>
              <div className='flex items-center gap-[8px]'>
                <h3 className='text-[#4A4B4D] text-[20px] font-bold'>Thẻ</h3>
              </div>
              <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
