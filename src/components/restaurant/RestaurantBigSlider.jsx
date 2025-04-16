"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import RestaurantBigCard from "./RestaurantBigCard";

const RestaurantBigSlider = ({ allStore }) => {
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
          {allStore.map((store) => (
            <SwiperSlide key={store._id}>
              <RestaurantBigCard store={store} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='block sm:hidden'>
        <div className='flex flex-col gap-[20px]'>
          {allStore.slice(0, 3).map((store) => (
            <RestaurantBigCard key={store._id} store={store} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantBigSlider;
