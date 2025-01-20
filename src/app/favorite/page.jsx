import Header from "@/components/header/Header";
import MobileHeader from "@/components/header/MobileHeader";
import Heading from "@/components/Heading";
import NavBar from "@/components/NavBar";
import RestaurantFavoriteCard from "@/components/restaurant/RestaurantFavoriteCard";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] md:w-[90%] md:mx-auto md:pt-[75px] md:mt-[20px]'>
      <Heading title='Yêu thích' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='favorite' />
      </div>

      <MobileHeader text='Quán yên thích' />

      <div className='px-[20px] py-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
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
