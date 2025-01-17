"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CategoryItem from "./CategoryItem";

const CategorySlider = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Swiper
      className='category-slider'
      grabCursor={true}
      breakpoints={{
        320: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 8,
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 10,
          spaceBetween: 25,
        },
      }}
    >
      {categories.map((category, index) => (
        <SwiperSlide key={index}>
          <CategoryItem active={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlider;
