"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CategoryItem from "./CategoryItem";

const CategorySlider = () => {
  const foodTypes = [
    {
      _id: "67c9120d2840623cd5723936",
      name: "Gà rán",
      image: {
        url: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
      },
    },
    {
      _id: "67c9128a8bdfd68d9d04b8fc",
      name: "Cháo",
      image: {
        url: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
      },
    },
  ];

  return (
    <>
      <div className='hidden sm:block'>
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
          {foodTypes.map((type) => (
            <SwiperSlide key={type._id}>
              <CategoryItem type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='block sm:hidden'>
        <div className='flex items-center gap-[15px] overflow-x-auto whitespace-nowrap'>
          {foodTypes.map((type) => (
            <CategoryItem key={type._id} type={type} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
