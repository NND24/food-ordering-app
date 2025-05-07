import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { useProvince } from "../../context/ProvinceContext";
import { getClosestProvince } from "../../utils/functions";
import { provinces } from "../../utils/constants";

const MobileHeader = ({ page }) => {
  const { notifications } = useSocket();

  const cartState = useSelector((state) => state.cart);
  const { userCart } = cartState;
  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const [province, setProvince] = useState({ name: "", lat: 200, lon: 200 });
  const [openSelectProvince, setOpenSelectProvince] = useState(false);

  const { setCurrentLocation } = useProvince();

  const handleProvinceChange = (prov) => {
    setProvince(prov);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          setProvince(getClosestProvince({ lat: userLat, lon: userLon }));
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (province.lat === 200) {
      setCurrentLocation({ lat: 10.762622, lon: 106.660172 });
    } else {
      setCurrentLocation({ lat: province.lat, lon: province.lon });
    }
  }, [province]);

  return (
    <div className='px-[20px] flex items-center justify-between md:hidden'>
      <Link href='/home' className='relative w-[60px] pt-[60px] h-[60px]'>
        <Image src='/assets/logo_app.png' layout='fill' objectFit='contain' alt='' />
      </Link>
      <div className='flex items-center gap-[15px]'>
        <div
          className='relative max-w-[100px] ml-[20px] flex flex-col items-center gap-[1px]'
          onClick={() => {
            setOpenSelectProvince(!openSelectProvince);
          }}
        >
          <div className='p-[6px] bg-red-600 rounded-full cursor-pointer'>
            <div className='relative w-[12px] pt-[13px]'>
              <Image src='/assets/star_yellow.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
          <p className='text-[12px] text-[#4a4b4d] whitespace-nowrap cursor-pointer'>{province.name}</p>

          {openSelectProvince && (
            <div className='absolute top-[50px] !left-[-65px] z-[100] h-[350px] w-[200px] overflow-y-scroll bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
              {provinces.map((prov) => (
                <div
                  key={prov.name}
                  onClick={() => {
                    setOpenSelectProvince(false);
                    handleProvinceChange(prov);
                  }}
                  className={`py-[15px] px-[20px] cursor-pointer ${
                    prov.name === province.name ? "bg-[#a3a3a3a3]" : "bg-[#fff]"
                  }`}
                  style={{ borderBottom: "1px solid #e0e0e0a3" }}
                >
                  <span className='text-[#4a4b4d] font-bold text-[15px]'>{prov.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {currentUser && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
