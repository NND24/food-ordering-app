import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderItem = ({ history, order }) => {
  console.log(order);
  return (
    <div className='flex flex-col overflow-hidden border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
      <Link
        href={`/restaurant/${order.store._id}`}
        className='flex gap-[15px] h-fit md:flex-col p-[10px] md:p-0 md:gap-[10px]'
      >
        <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px] md:w-full md:pt-[45%] md:rounded-[8px]'>
          <Image
            src={order.store.avatar.url}
            alt=''
            layout='fill'
            objectFit='cover'
            className='rounded-full md:rounded-[8px]'
          />
        </div>

        <div className='flex flex-col md:px-[10px] md:pb-[10px]'>
          <span className='text-[#4A4B4D] text-[20px] font-bold'>{order.store.name}</span>
          <div className='flex items-center gap-[6px]'>
            <span className='text-[#a4a5a8]'>{order.items.length} món</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
            <span className='text-[#a4a5a8] line-clamp-1 w-[80%]'>{order.shipLocation.address}</span>
          </div>
        </div>
      </Link>

      {history ? (
        <div className='flex items-center' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <Link
            href={`/restaurant/${order.store._id}/cart`}
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-bl-md'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đặt lại</span>
          </Link>
          <Link
            href={`/restaurant/${order.store._id}/rating/add-rating/${order._id}`}
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-br-md'
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đánh giá</span>
          </Link>
        </div>
      ) : (
        <div className='flex items-center gap-[20px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <Link
            href={`/orders/order/${order._id}`}
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
