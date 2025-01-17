"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import RestaurantBigCard from "./RestaurantBigCard";

const RestaurantBigSlider = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className='hidden sm:block'>
        <Swiper
          className='big-card-slider'
          grabCursor={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <RestaurantBigCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='block sm:hidden'>
        <div className='flex flex-col gap-[20px]'>
          {categories.slice(0, 3).map((category, index) => (
            <SwiperSlide key={index}>
              <RestaurantBigCard />
            </SwiperSlide>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantBigSlider;
