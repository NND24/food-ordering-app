"use client";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLazyLogoutUserQuery } from "../../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTheme } from "next-themes";
import { useTranslation } from "../../hooks/useTranslation";

const page = () => {
  const [triggerLogout] = useLazyLogoutUserQuery();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.user);

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: t("account.logoutConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("account.agree"),
      cancelButtonText: t("common.cancel"),
    });

    if (result.isConfirmed) {
      await triggerLogout();
    }
  };

  const menuItem = (href, icon, label) => (
    <Link
      href={href}
      className='bg-white dark:bg-gray-800 flex items-center justify-between border-b border-b-[#a3a3a3] dark:border-gray-700 px-[8px] py-[12px] my-[20px] transition-colors'
    >
      <div className='flex items-center gap-[10px]'>
        <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
          <Image
            src={`/assets/${icon}${theme === "dark" ? "_white" : ""}.png`}
            alt=''
            layout='fill'
            objectFit='contain'
          />
        </div>
        <span className='text-[20px] font-semibold text-[#4A4B4D] dark:text-gray-100'>{label}</span>
      </div>
      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
        <Image
          src={`/assets/arrow_right${theme === "dark" ? "_white" : ""}.png`}
          alt=''
          layout='fill'
          objectFit='contain'
        />
      </div>
    </Link>
  );

  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px] md:mt-[20px] md:px-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Heading title={t("account.title")} description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <MobileHeader />

      <div className='bg-white dark:bg-gray-800 lg:w-[75%] px-[20px] md:w-[80%] py-[20px] mb-[20px] md:mx-auto md:border md:border-[#a3a3a3a3] dark:md:border-gray-700 md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden transition-colors duration-300'>
        {/* Profile */}
        <Link href='/account/profile' className='flex gap-[15px] mb-[20px] cursor-pointer'>
          <div className='relative w-[60px] pt-[60px]'>
            <Image
              src={
                currentUser?.avatar?.url ||
                "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
              }
              alt=''
              layout='fill'
              objectFit='cover'
              className='rounded-[6px]'
            />
          </div>
          <div className='flex flex-1 justify-between items-center'>
            <div>
              <p className='text-[22px] font-semibold text-[#4A4B4D] dark:text-gray-100'>{currentUser?.name}</p>
              <p className='text-[16px] text-[#636464] dark:text-gray-400'>{currentUser?.phonenumber}</p>
            </div>
            <div className='relative w-[30px] pt-[30px]'>
              <Image src='/assets/pencil.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
        </Link>

        {/* Tablet-only links */}
        <div className='hidden md:block lg:hidden'>
          {menuItem("/favorite", "favorite", t("account.favorite"))}
        </div>

        {menuItem("/account/location", "location", t("account.address"))}

        {!currentUser?.isGoogleLogin && menuItem("/account/change-password", "lock", t("account.changePassword"))}

        {menuItem("/account/setting", "setting", t("account.settings"))}

        <button
          onClick={confirmLogout}
          className='bg-[#fc6011] text-white font-semibold w-full p-[20px] rounded-full my-[10px] cursor-pointer shadow-md hover:shadow-lg'
        >
          {t("account.logout")}
        </button>
      </div>

      <div className='block md:hidden'>
        <NavBar page='account' />
      </div>
    </div>
  );
};

export default page;
