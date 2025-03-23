"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import MostRatingReviewItem from "./MostRatingReviewItem";

const MostRatingReviewSlider = ({ allStoreRatingDesc }) => {
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
          {allStoreRatingDesc.map((rating, index) => (
            <SwiperSlide key={index}>
              <MostRatingReviewItem rating={rating} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='block sm:hidden'>
        <div className='flex items-center gap-[20px] overflow-x-auto whitespace-nowrap pb-[20px]'>
          {allStoreRatingDesc.map((rating, index) => (
            <MostRatingReviewItem key={index} rating={rating} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MostRatingReviewSlider;
