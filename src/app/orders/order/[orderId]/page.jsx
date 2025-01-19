import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import OrderSummary from "@/components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pb-[140px] md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Chi tiết đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='lg:w-[60%] md:w-[80%] md:mx-auto'>
        <div className='flex items-center justify-between px-[20px] py-[20px] md:hidden'>
          <Image
            src='/assets/left-arrow.png'
            alt=''
            width={40}
            height={40}
            className='p-[8px] rounded-full bg-[#e0e0e0a3]'
          />
        </div>

        <div className='bg-[#fff] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:p-[20px]'>
          <h3 className='text-[#4A4B4D] text-[28px] font-bold'>16:15 - 16:25</h3>
          <span className='text-[#a4a5a8] text-[18px]'>Đang sắp xếp đơn hàng</span>

          <div className='relative flex items-center justify-between py-[10px]'>
            <Image src='/assets/start-active.png' alt='' width={25} height={25} />
            <div className='absolute top-[45%] left-[9%] h-[4px] w-[20%] bg-[#fc6011] rounded-[4px]'></div>
            <Image src='/assets/cooking.png' alt='' width={25} height={25} />
            <div className='absolute top-[45%] left-[40%] h-[4px] w-[20%] bg-[#a4a5a8] rounded-[4px]'></div>
            <Image src='/assets/delivery.png' alt='' width={25} height={25} />
            <div className='absolute top-[45%] right-[10%] h-[4px] w-[20%] bg-[#a4a5a8] rounded-[4px]'></div>
            <Image src='/assets/home.png' alt='' width={25} height={25} />
          </div>
        </div>

        <div className='bg-[#fff] flex flex-col gap-[15px] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:p-[20px]'>
          <div className='flex gap-[15px]'>
            <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px]'>
              <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
            </div>

            <div className='flex flex-col'>
              <div className='flex items-center gap-[6px]'>
                <span className='text-[#4A4B4D] text-[20px] font-bold'>Nguyễn Văn A</span>
                <span className='text-[#4A4B4D] text-[16px] font-medium'>4.9</span>
                <Image src='/assets/star-active.png' alt='' width={20} height={20} />
              </div>
              <div className='flex items-center gap-[6px]'>
                <span className='text-[#a4a5a8]'>Yamaha Exciter</span>
                <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                <span className='text-[#a4a5a8]'>47AC-98745</span>
              </div>
            </div>
          </div>

          <div className='flex items-center gam-[20px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
            <div
              className='flex-1 flex justify-center p-[10px] cursor-pointer hover:bg-[#e0e0e0a3]'
              style={{ borderRight: "1px solid #e0e0e0a3" }}
            >
              <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/phone.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
            <div className='flex-1 flex justify-center p-[10px] cursor-pointer hover:bg-[#e0e0e0a3]'>
              <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/send.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#fff] flex flex-col gap-[15px] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:p-[20px]'>
          <div className='flex gap-[15px]'>
            <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[70px]'>
              <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
            </div>

            <div className='flex flex-col'>
              <h4 className='text-[#4A4B4D] text-[24px] font-medium pt-[2px] line-clamp-1'>Gà quay Thiên Phúc</h4>
              <p className='text-[#a4a5a8]'>Cách 6.5km</p>
            </div>
          </div>

          <div className='flex items-center gam-[20px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
            <div
              className='flex-1 flex justify-center p-[10px] cursor-pointer hover:bg-[#e0e0e0a3]'
              style={{ borderRight: "1px solid #e0e0e0a3" }}
            >
              <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/phone.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
            <div className='flex-1 flex justify-center p-[10px] cursor-pointer hover:bg-[#e0e0e0a3]'>
              <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/send.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#fff] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <OrderSummary />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] p-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <Link
          href='/orders/order/123'
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] md:py-[10px] lg:w-[60%] md:w-[80%] md:mx-auto'
        >
          <span className='text-[#fff] text-[20px] font-semibold md:text-[18px]'>Theo dõi vị trí đơn hàng</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
