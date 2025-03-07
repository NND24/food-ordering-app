"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import RestaurantCard from "./RestaurantCard";

const RestaurantSlider = ({ reverse, stores }) => {
  return (
    <Swiper
      className='card-slider mb-[15px]'
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
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
      {stores.map((store) => (
        <SwiperSlide key={store._id}>
          <RestaurantCard store={store} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RestaurantSlider;
