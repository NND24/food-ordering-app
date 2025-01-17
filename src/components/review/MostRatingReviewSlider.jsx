"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import MostRatingReviewItem from "./MostRatingReviewItem";

const MostRatingReviewSlider = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className='hidden sm:block'>
        <Swiper
          className='big-card-slider'
          grabCursor={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView='2'
          spaceBetween='20'
        >
          {categories.slice(0, 3).map((category, index) => (
            <SwiperSlide key={index}>
              <MostRatingReviewItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='block sm:hidden'>
        <div className='flex items-center gap-[20px] overflow-x-auto whitespace-nowrap pb-[20px]'>
          {categories.slice(0, 3).map((category, index) => (
            <MostRatingReviewItem />
          ))}
        </div>
      </div>
    </>
  );
};

export default MostRatingReviewSlider;
