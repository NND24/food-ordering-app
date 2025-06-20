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
  const [currentOrders, setCurrentOrders] = useState([]);
  const [doneOrders, setDoneOrders] = useState([]);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;
  const orderState = useSelector((state) => state.order);
  const { userOrder } = orderState;

  useEffect(() => {
    console.log("userOrder: ", userOrder);
  }, [userOrder]);

  const { isLoading: getUserOrderLoading, refetch: refetchUserOrder } = useGetUserOrderQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    refetchUserOrder();
  }, []);

  useEffect(() => {
    setCurrentOrders(userOrder?.filter((order) => order.status !== "done"));
    setDoneOrders(userOrder?.filter((order) => order.status === "done"));
  }, [userOrder]);

  return (
    <div className='pt-[10px] pb-[100px] md:pt-[90px] md:px-0'>
      <Heading title='Đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='orders' />
      </div>

      <MobileHeader />

      <div className='px-[20px] md:w-[90%] md:mx-auto'>
        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Đơn hàng hiện tại</h3>
          <div className='current-orders-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            {!getUserOrderLoading ? (
              <>
                {currentOrders ? (
                  currentOrders.map((order) => <OrderItem key={order._id} order={order} history={false} />)
                ) : (
                  <h3 className='no-current-orders text-[20px] text-[#4a4b4d] font-semibold'>Không có đơn hàng nào</h3>
                )}
              </>
            ) : (
              <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Đang tải...</h3>
            )}
          </div>
        </div>

        <div className='my-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[10px]'>Lịch sử</h3>
          <div className='done-orders-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
            {!getUserOrderLoading ? (
              <>
                {doneOrders ? (
                  doneOrders.map((order) => <OrderItem key={order._id} order={order} history={true} />)
                ) : (
                  <h3 className='no-history-orders text-[20px] text-[#4a4b4d] font-semibold'>Không có đơn hàng nào</h3>
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
