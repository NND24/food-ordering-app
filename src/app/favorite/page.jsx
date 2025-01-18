import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import RestaurantFavoriteCard from "@/components/restaurant/RestaurantFavoriteCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px] md:w-[90%] md:mx-auto md:pt-[75px] md:mt-[20px]'>
      <div className='hidden md:block'>
        <Header page='favorite' />
      </div>

      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Quán yêu thích</h3>
        <Link href='/notifications' className='relative w-[30px] pt-[30px]'>
          <Image src='/assets/notification.png' alt='' layout='fill' objectFit='contain' />
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
        <RestaurantFavoriteCard />
        <RestaurantFavoriteCard />
        <RestaurantFavoriteCard />
        <RestaurantFavoriteCard />
      </div>

      <div className='md:hidden'>
        <NavBar page='favorite' />
      </div>
    </div>
  );
};

export default page;
