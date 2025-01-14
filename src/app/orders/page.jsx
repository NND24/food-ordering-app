import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Đơn hàng</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <div className='my-[20px]'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Đơn hiện tại</h3>
        <div className='flex flex-col gap-[15px] p-[10px] mb-[20px] mt-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex gap-[15px]'>
            <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
              <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
            </div>

            <div className='flex flex-col'>
              <span className='text-[#4A4B4D] text-[20px] font-bold'>Minute by tuk tuk</span>
              <div className='flex items-center gap-[6px]'>
                <span className='text-[#a4a5a8]'>2 món</span>
                <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                <span className='text-[#a4a5a8]'>123 quốc lộ 14</span>
              </div>
            </div>
          </div>

          <div className='flex items-center gam-[20px] p-[10px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
            <Link href='/restaurant/123/order/321' className='flex-1 flex justify-center'>
              <span className='text-[#4A4B4D] text-[18px] font-semibold'>Xem tiến trình đơn hàng</span>
            </Link>
          </div>
        </div>
      </div>

      <div className='my-[20px]'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Lịch sử</h3>
        <div className='flex flex-col gap-[15px] p-[10px] mb-[20px] mt-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
          <div className='flex gap-[15px]'>
            <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
              <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
            </div>

            <div className='flex flex-col'>
              <span className='text-[#4A4B4D] text-[20px] font-bold'>Minute by tuk tuk</span>
              <div className='flex items-center gap-[6px]'>
                <span className='text-[#a4a5a8]'>2 món</span>
                <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                <span className='text-[#a4a5a8]'>123 quốc lộ 14</span>
              </div>
            </div>
          </div>

          <div className='flex items-center gam-[20px] p-[10px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
            <Link
              href='/restaurant/123/cart/321'
              className='flex-1 flex justify-center'
              style={{ borderRight: "1px solid #e0e0e0a3" }}
            >
              <span className='text-[#4A4B4D] text-[18px] font-semibold'>Đặt lại</span>
            </Link>
            <Link href='/restaurant/123/reviews' className='flex-1 flex justify-center'>
              <span className='text-[#4A4B4D] text-[18px] font-semibold'>Đánh giá</span>
            </Link>
          </div>
        </div>
      </div>

      <NavBar page='orders' />
    </div>
  );
};

export default page;
