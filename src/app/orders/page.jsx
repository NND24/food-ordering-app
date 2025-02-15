import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import OrderItem from "../../components/order/OrderItem";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px] md:px-0'>
      <Heading title='Đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='orders' />
      </div>

      <MobileHeader text='Đơn hàng' />

      <div className='px-[20px] md:w-[90%] md:mx-auto'>
        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Đơn hiện tại</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            <OrderItem history={false} />
            <OrderItem history={false} />
            <OrderItem history={false} />
          </div>
        </div>

        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Lịch sử</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            <OrderItem history={true} />
            <OrderItem history={true} />
            <OrderItem history={true} />
          </div>
        </div>
      </div>

      <div className='block md:hidden'>
        <NavBar page='orders' />
      </div>
    </div>
  );
};

export default page;
