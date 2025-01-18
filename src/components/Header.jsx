import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Header = ({ page }) => {
  return (
    <div className={`fixed top-0 right-0 left-0 z-[99] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-[#fff]`}>
      <div className='pt-[30px] px-[20px] h-[180px] md:hidden'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Xin chào Đạt</h3>
          <Link href='/notifications'>
            <Image src='/assets/notification.png' alt='' width={30} height={30} />
          </Link>
        </div>
        <SearchBar />
      </div>

      <div className='w-[90%] mx-auto hidden md:block'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[30px] md:w-[45%] lg:w-[40%]'>
            <Link href='/home'>
              <Image src='/assets/app_logo.png' alt='' height={60} width={60} className='' />
            </Link>
            <SearchBar />
          </div>

          <NavBar page={page} />
        </div>
      </div>
    </div>
  );
};

export default Header;
