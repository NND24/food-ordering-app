import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = ({ page }) => {
  return (
    <div className='fixed bottom-0 right-0 left-0 pt-[5px] bg-[#fff] w-full h-[75px] px-[25px] shadow-[0px_-10px_40px_0px_rgba(110,110,110,0.45)]'>
      <div className='relative flex items-center justify-between h-full w-full'>
        <div className='flex items-center gap-[30px]'>
          <Link href='/message' className='flex flex-col  items-center gap-[1px]'>
            <Image
              src={`${page == "message" ? "/assets/message-active.png" : "/assets/message.png"}`}
              alt=''
              width={24}
              height={24}
            />
            <p className={`text-[12px] ${page == "message" ? "text-[#fc6011]" : "text-[#4A4B4D]"}`}>Tin nhắn</p>
          </Link>
          <Link href='/orders' className='flex flex-col  items-center gap-[1px]'>
            <Image
              src={`${page == "orders" ? "/assets/order-active.png" : "/assets/order.png"}`}
              alt=''
              width={24}
              height={24}
            />
            <p className={`text-[12px] ${page == "orders" ? "text-[#fc6011]" : "text-[#4A4B4D]"}`}>Đơn hàng</p>
          </Link>
        </div>
        <Link
          href='/home'
          className='absolute top-[-40px] right-[50%] translate-x-[50%] bg-[#fff] p-[15px] rounded-full'
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
          <Link href='/favorite' className='flex flex-col  items-center gap-[1px]'>
            <Image
              src={`${page == "favorite" ? "/assets/favorite-active.png" : "/assets/favorite.png"}`}
              alt=''
              width={24}
              height={24}
            />
            <p className={`text-[12px] ${page == "favorite" ? "text-[#fc6011]" : "text-[#4A4B4D]"}`}>Yêu Thích</p>
          </Link>

          <Link href='/account' className='flex flex-col  items-center gap-[1px]'>
            <Image
              src={`${page == "account" ? "/assets/account-active.png" : "/assets/account.png"}`}
              alt=''
              width={24}
              height={24}
            />
            <p className={`text-[12px] ${page == "account" ? "text-[#fc6011]" : "text-[#4A4B4D]"}`}>Tài Khoản</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
