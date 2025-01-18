import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderItem = ({ history }) => {
  return (
    <div className='flex flex-col gap-[15px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
      <div className='flex gap-[15px]'>
        <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[70px]'>
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

      {history ? (
        <div className='flex items-center gam-[20px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <Link
            href='/restaurant/123/cart/321'
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-bl-md'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đặt lại</span>
          </Link>
          <Link
            href='/restaurant/123/reviews'
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-br-md'
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đánh giá</span>
          </Link>
        </div>
      ) : (
        <div className='flex items-center gam-[20px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <Link
            href='/restaurant/123/order/321'
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-bl-md rounded-br-md'
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Xem tiến trình đơn hàng</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
