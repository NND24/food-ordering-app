"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";
import MobileHeader from "./MobileHeader";
import { provinces } from "../../utils/constants";
import { getClosestProvince } from "../../utils/functions";
import { useProvince } from "../../context/ProvinceContext";

const Header = ({ page }) => {
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
    <div className={`fixed top-0 right-0 left-0 z-[99] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-[#fff]`}>
      <div className='pt-[10px] md:pt-[30px] h-fit md:h-[180px] md:hidden'>
        <MobileHeader />
        <div className='px-[20px]'>
          <SearchBar />
        </div>
      </div>

      <div className='w-[90%] mx-auto hidden md:block'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[30px] md:w-[45%] lg:w-[40%]'>
            <Link href='/home' className='relative w-[60px] pt-[60px] h-[60px]'>
              <Image src='/assets/logo_app.png' layout='fill' objectFit='contain' alt='' />
            </Link>

            <SearchBar />
          </div>

          <div className='flex items-center'>
            <NavBar page={page} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
