import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";

const MobileHeader = ({ text, page }) => {
  const { notifications } = useSocket();

  const cartState = useSelector((state) => state.cart);
  const { userCart } = cartState;

  return (
    <div className='px-[20px] flex items-center justify-between md:hidden'>
      <h3 className='text-[#4A4B4D] text-[28px] font-bold'>{text}</h3>
      <div className='flex items-center gap-[15px]'>
        <Link href='/notifications' className='relative group flex flex-col items-center gap-[1px]'>
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

          {notifications.filter((noti) => noti.status === "unread").length > 0 && (
            <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border-solid border-[1px] border-white flex items-center justify-center'>
              <span className='text-[11px] text-white'>
                {notifications.filter((noti) => noti.status === "unread").length}
              </span>
            </div>
          )}
        </Link>

        <Link href='/carts' className='relative group flex flex-col items-center gap-[1px]'>
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

          {userCart && userCart.length > 0 && (
            <div className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border-solid border-[1px] border-white flex items-center justify-center'>
              <span className='text-[11px] text-white'>{userCart.length}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
