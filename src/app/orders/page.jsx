"use client";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import OrderItem from "../../components/order/OrderItem";
import React, { useEffect, useState } from "react";
import { useGetUserOrderQuery } from "../../redux/features/order/orderApi";
import { useSelector } from "react-redux";

const page = () => {
  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;
  const orderState = useSelector((state) => state.order);
  const { userOrder } = orderState;

  const { isLoading: getUserOrderLoading, refetch: refetchUserOrder } = useGetUserOrderQuery(null, {
    skip: !currentUser,
  });

  useEffect(() => {
    if (currentUser) {
      refetchUserOrder();
    }
  }, [currentUser, refetchUserOrder]);

  useEffect(() => {
    console.log(userOrder);
  }, [userOrder]);

  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px] md:px-0'>
      <Heading title='Đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='orders' />
      </div>

      <MobileHeader text='Đơn hàng' />

      <div className='px-[20px] md:w-[90%] md:mx-auto'>
        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Đơn hàng hiện tại</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            {!getUserOrderLoading ? (
              <>
                {userOrder ? (
                  userOrder.map((order) => <OrderItem key={order._id} order={order} history={false} />)
                ) : (
                  <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Không có đơn hàng nào</h3>
                )}
              </>
            ) : (
              <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Đang tải...</h3>
            )}
          </div>
        </div>

        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Lịch sử</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            {!getUserOrderLoading ? (
              <>
                {userOrder ? (
                  userOrder.map((order) => <OrderItem key={order._id} order={order} history={true} />)
                ) : (
                  <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Không có đơn hàng nào</h3>
                )}
              </>
            ) : (
              <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Đang tải...</h3>
            )}
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
