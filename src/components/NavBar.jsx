"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";
import { useTheme } from "next-themes";
import { useTranslation } from "../hooks/useTranslation";

const NavBar = ({ page }) => {
  const { notifications } = useSocket();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.user);
  const { userFavorite } = useSelector((state) => state.favorite);
  const { userCart } = useSelector((state) => state.cart);
  const { userOrder } = useSelector((state) => state.order);

  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    setCurrentOrders(userOrder?.filter((o) => o.status !== "done") ?? []);
  }, [userOrder]);

  return (
    <div
      className='fixed bottom-0 right-0 left-0 z-[99] pt-[5px]
      max-md:bg-white max-md:dark:bg-gray-900
      max-md:shadow-[0px_-10px_40px_0px_rgba(110,110,110,0.45)] max-md:dark:shadow-[0px_-10px_40px_0px_rgba(0,0,0,0.4)]
      max-md:border-t max-md:border-gray-200 max-md:dark:border-gray-700
      transition-all duration-300
      md:relative md:w-fit md:p-0'
    >
      {!currentUser ? (
        <div className='flex items-center gap-[20px] h-[75px]'>
          <Link
            href='/auth/login'
            className='text-white text-[18px] font-semibold cursor-pointer
            bg-[#fc6011] flex-1 md:flex-none text-center p-[15px] md:py-[10px] md:px-[15px]
            rounded-[6px] shadow-md hover:shadow-lg transition'
          >
            {t("nav.login")}
          </Link>
          <Link
            href='/auth/register'
            className='text-white text-[18px] font-semibold cursor-pointer
            bg-[#fc6011] flex-1 md:flex-none text-center p-[15px] md:py-[10px] md:px-[15px]
            rounded-[6px] shadow-md hover:shadow-lg transition'
          >
            {t("nav.register")}
          </Link>
        </div>
      ) : (
        <div className='relative flex items-center justify-between h-full w-full md:justify-normal md:gap-[20px]'>

          {/* ── LEFT SIDE ── */}
          <div className='flex items-center gap-[20px]'>

            {/* Message — always on left */}
            <Link href='/message' className='group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/message${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "message" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/message_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "message" ? "!block" : ""}`}
              />
              <p className={`text-[12px] md:text-[11px] lg:text-[12px] group-hover:text-[#fc6011] ${page == "message" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}>
                {t("nav.message")}
              </p>
            </Link>

            <Link href='/orders' className='relative group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/ic_order${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "orders" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/ic_order_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "orders" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] md:text-[11px] lg:text-[12px]
                group-hover:text-[#fc6011]
                ${page == "orders" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
              >
                {t("nav.orders")}
              </p>
              {currentOrders.length > 0 && (
                <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white dark:border-gray-900 flex items-center justify-center'>
                  <span className='text-[11px] text-white'>{currentOrders.length}</span>
                </div>
              )}
            </Link>
          </div>

          {/* Home Button (Mobile) */}
          <Link
            href='/home'
            className='absolute top-[-40px] right-[50%] translate-x-[50%]
            bg-white dark:bg-gray-800 p-[15px] rounded-full md:hidden shadow-md transition'
          >
            <Image
              src='/assets/tab_home.png'
              alt=''
              width={70}
              height={70}
              className={`p-[20px] rounded-full ${page === "home" ? "bg-[#fc6011]" : "bg-[#b6b7b7] dark:bg-gray-700"}`}
            />
          </Link>

          {/* ── RIGHT SIDE ── */}
          <div className='flex items-center gap-[20px]'>

            {/* Notification — desktop only */}
            <div className='hidden md:block'>
              <Link href='/notifications' className='relative group flex flex-col items-center gap-[1px]'>
                <Image
                  src={`/assets/notification${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={24}
                  height={24}
                  className={`group-hover:hidden ${page == "notifications" ? "!hidden" : ""}`}
                />
                <Image
                  src='/assets/notification_active.png'
                  alt=''
                  width={24}
                  height={24}
                  className={`hidden group-hover:block ${page == "notifications" ? "!block" : ""}`}
                />
                <p
                  className={`text-[12px] md:text-[11px] lg:text-[12px]
                  group-hover:text-[#fc6011]
                  ${page == "notifications" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
                >
                  {t("nav.notifications")}
                </p>
                {notifications.filter((n) => n.status === "unread").length > 0 && (
                  <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white dark:border-gray-900 flex items-center justify-center'>
                    <span className='text-[11px] text-white'>
                      {notifications.filter((n) => n.status === "unread").length}
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Cart — desktop only (next to Notification) */}
            <div className='hidden md:block'>
              <Link href='/carts' className='relative group flex flex-col items-center gap-[1px]'>
                <Image
                  src={`/assets/cart${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={24}
                  height={24}
                  className={`group-hover:hidden ${page == "carts" ? "!hidden" : ""}`}
                />
                <Image
                  src='/assets/cart_active.png'
                  alt=''
                  width={24}
                  height={24}
                  className={`hidden group-hover:block ${page == "carts" ? "!block" : ""}`}
                />
                <p
                  className={`text-[12px] md:text-[11px] lg:text-[12px]
                  group-hover:text-[#fc6011]
                  ${page == "carts" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
                >
                  {t("nav.cart")}
                </p>
                {userCart && userCart.length > 0 && (
                  <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white dark:border-gray-900 flex items-center justify-center'>
                    <span className='text-[11px] text-white'>{userCart.length}</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Favorite */}
            <div className='block md:hidden lg:block'>
              <Link href='/favorite' className='relative group flex flex-col items-center gap-[1px]'>
                <Image
                  src={`/assets/favorite${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={24}
                  height={24}
                  className={`group-hover:hidden ${page == "favorite" ? "!hidden" : ""}`}
                />
                <Image
                  src='/assets/favorite-active.png'
                  alt=''
                  width={24}
                  height={24}
                  className={`hidden group-hover:block ${page == "favorite" ? "!block" : ""}`}
                />
                <p
                  className={`text-[12px] md:text-[11px] lg:text-[12px]
                  group-hover:text-[#fc6011]
                  ${page == "favorite" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
                >
                  {t("nav.favorite")}
                </p>
                {userFavorite && userFavorite?.store?.length > 0 && (
                  <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white dark:border-gray-900 flex items-center justify-center'>
                    <span className='text-[11px] text-white'>{userFavorite.store.length}</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Account */}
            <Link href='/account' className='group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/account${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "account" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/account_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "account" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] md:text-[11px] lg:text-[12px]
                group-hover:text-[#fc6011]
                ${page == "account" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
              >
                {t("nav.account")}
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
