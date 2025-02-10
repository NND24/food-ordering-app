import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = ({ page }) => {
  return (
    <div className='fixed bottom-0 right-0 left-0 z-[99] pt-[5px] bg-[#fff] w-full h-[75px] px-[25px] shadow-[0px_-10px_40px_0px_rgba(110,110,110,0.45)] md:relative md:w-fit md:p-0 md:shadow-none'>
      <div className='relative flex items-center justify-between h-full w-full md:justify-normal md:gap-[20px]'>
        <div className='flex items-center gap-[20px]'>
          <Link href='/message' className='group flex flex-col items-center gap-[1px]'>
            <Image
              src='/assets/message.png'
              alt=''
              width={24}
              height={24}
              className={`group-hover:hidden  ${page == "message" ? "!hidden" : ""}`}
            />
            <Image
              src='/assets/message_active.png'
              alt=''
              width={24}
              height={24}
              className={`hidden group-hover:block ${page == "message" ? "!block" : ""}`}
            />
            <p
              className={`text-[12px] group-hover:text-[#fc6011] ${
                page == "message" ? "text-[#fc6011]" : "text-[#4A4B4D]"
              }`}
            >
              Tin nhắn
            </p>
          </Link>
          <Link href='/orders' className='group flex flex-col items-center gap-[1px]'>
            <Image
              src='/assets/order.png'
              alt=''
              width={24}
              height={24}
              className={`group-hover:hidden  ${page == "orders" ? "!hidden" : ""}`}
            />
            <Image
              src='/assets/order-active.png'
              alt=''
              width={24}
              height={24}
              className={`hidden group-hover:block ${page == "orders" ? "!block" : ""}`}
            />
            <p
              className={`text-[12px] group-hover:text-[#fc6011] ${
                page == "orders" ? "text-[#fc6011]" : "text-[#4A4B4D]"
              }`}
            >
              Đơn hàng
            </p>
          </Link>
        </div>
        <Link
          href='/home'
          className='absolute top-[-40px] right-[50%] translate-x-[50%] bg-[#fff] p-[15px] rounded-full md:hidden'
        >
          <Image
            src='/assets/tab_home.png'
            alt=''
            width={70}
            height={70}
            className={`p-[20px] rounded-full ${page === "home" ? "bg-[#fc6011]" : "bg-[#b6b7b7]"}`}
          />
        </Link>
        <div className='flex items-center gap-[20px]'>
          <div className='hidden md:block'>
            <Link href='/notifications' className='group flex flex-col items-center gap-[1px]'>
              <Image
                src='/assets/notification.png'
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden  ${page == "notifications" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/notification_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "notifications" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] group-hover:text-[#fc6011] ${
                  page == "notifications" ? "text-[#fc6011]" : "text-[#4A4B4D]"
                }`}
              >
                Thông báo
              </p>
            </Link>
          </div>

          <div className='hidden md:block'>
            <Link href='/carts' className='group flex flex-col items-center gap-[1px]'>
              <Image
                src='/assets/cart.png'
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden  ${page == "carts" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/cart_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "carts" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] group-hover:text-[#fc6011] ${
                  page == "carts" ? "text-[#fc6011]" : "text-[#4A4B4D]"
                }`}
              >
                Giỏ hàng
              </p>
            </Link>
          </div>

          <Link href='/favorite' className='group flex flex-col items-center gap-[1px]'>
            <Image
              src='/assets/favorite.png'
              alt=''
              width={24}
              height={24}
              className={`group-hover:hidden  ${page == "favorite" ? "!hidden" : ""}`}
            />
            <Image
              src='/assets/favorite_active.png'
              alt=''
              width={24}
              height={24}
              className={`hidden group-hover:block ${page == "favorite" ? "!block" : ""}`}
            />
            <p
              className={`text-[12px] group-hover:text-[#fc6011] ${
                page == "favorite" ? "text-[#fc6011]" : "text-[#4A4B4D]"
              }`}
            >
              Yêu Thích
            </p>
          </Link>

          <Link href='/account' className='group flex flex-col items-center gap-[1px]'>
            <Image
              src='/assets/account.png'
              alt=''
              width={24}
              height={24}
              className={`group-hover:hidden  ${page == "account" ? "!hidden" : ""}`}
            />
            <Image
              src='/assets/account_active.png'
              alt=''
              width={24}
              height={24}
              className={`hidden group-hover:block ${page == "account" ? "!block" : ""}`}
            />
            <p
              className={`text-[12px] group-hover:text-[#fc6011] ${
                page == "account" ? "text-[#fc6011]" : "text-[#4A4B4D]"
              }`}
            >
              Tài Khoản
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
