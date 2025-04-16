"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";

const Header = ({ page }) => {
  const userState = useSelector((state) => state?.user);
  const { currentUser } = userState;

  return (
    <div className={`fixed top-0 right-0 left-0 z-[99] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-[#fff]`}>
      <div className='pt-[30px] h-[180px] md:hidden'>
        <MobileHeader text={`Xin chào ${currentUser && currentUser.name.split(" ").pop()}`} />
        <div className='px-[20px]'>
          <SearchBar />
        </div>
      </div>

      <div className='w-[90%] mx-auto hidden md:block'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[30px] md:w-[45%] lg:w-[40%]'>
            <Link href='/home'>
              <Image src='/assets/logo_app.png' alt='' height={60} width={60} className='' />
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
