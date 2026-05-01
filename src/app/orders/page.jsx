"use client";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import OrderItem from "../../components/order/OrderItem";
import React, { useEffect, useState } from "react";
import { useGetUserOrderQuery } from "../../redux/features/order/orderApi";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";

const page = () => {
  const { t } = useTranslation();
  const [currentOrders, setCurrentOrders] = useState([]);
  const [doneOrders, setDoneOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("current");

  const { currentUser } = useSelector((state) => state.user);
  const { userOrder } = useSelector((state) => state.order);

  const { isLoading, refetch } = useGetUserOrderQuery(null, {
    skip: !currentUser,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (currentUser) refetch();
  }, []);

  useEffect(() => {
    setCurrentOrders(userOrder?.filter((order) => order.status !== "done") || []);
    setDoneOrders(userOrder?.filter((order) => order.status === "done") || []);
  }, [userOrder]);

  return (
    <div className='pt-[10px] pb-[100px] md:pt-[90px] md:px-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300'>
      <Heading title='Đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='orders' />
      </div>
      <MobileHeader />

      <div className='px-[20px] md:w-[90%] md:mx-auto'>
        {/* Tabs */}
        <div className='flex items-center justify-center mb-6 bg-gray-100 dark:bg-gray-800 rounded-full p-1 transition-colors'>
          <button
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
              activeTab === "current"
                ? "bg-[#fc6011] text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-[#fc6011]"
            }`}
            onClick={() => setActiveTab("current")}
          >
            {t("order.current")}
          </button>
          <button
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
              activeTab === "history"
                ? "bg-[#fc6011] text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:text-[#fc6011]"
            }`}
            onClick={() => setActiveTab("history")}
          >
            {t("order.history")}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "current" && (
          <>
            {isLoading ? (
              <div className='w-full flex items-center justify-center py-20'>
                <Atom color='#fc6011' size='medium' text='' textColor='' />
              </div>
            ) : currentOrders.length === 0 ? (
              <div className='flex flex-col items-center text-center py-10'>
                <h3 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100'>{t("order.currentEmpty")}</h3>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>{t("order.currentEmptyDesc")}</p>
                <Link
                  href='/search'
                  className='mt-5 px-6 py-3 bg-[#fc6011] text-white rounded-full shadow hover:scale-105 transition-transform'
                >
                  {t("order.shopNow")}
                </Link>
              </div>
            ) : (
              <div className='current-orders-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[20px]'>
                {currentOrders.map((order) => (
                  <OrderItem key={order._id} order={order} history={false} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            {isLoading ? (
              <div className='w-full flex items-center justify-center py-20'>
                <Atom color='#fc6011' size='medium' text='' textColor='' />
              </div>
            ) : doneOrders.length === 0 ? (
              <div className='flex flex-col items-center text-center py-10'>
                <h3 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100'>{t("order.historyEmpty")}</h3>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>{t("order.historyEmptyDesc")}</p>
              </div>
            ) : (
              <div className='done-orders-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[20px]'>
                {doneOrders.map((order) => (
                  <OrderItem key={order._id} order={order} history={true} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className='block md:hidden'>
        <NavBar page='orders' />
      </div>
    </div>
  );
};

export default page;
