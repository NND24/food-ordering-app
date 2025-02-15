import Heading from "../../../../components/Heading";
import RatingBar from "../../../../components/review/RatingBar";
import ReviewItem from "../../../../components/review/ReviewItem";
import Image from "next/image";
import React from "react";

const page = () => {
  const ratings = {
    5: 50,
    4: 30,
    3: 15,
    2: 5,
    1: 10,
  };

  return (
    <div>
      <Heading title='Nhận xét' description='' keywords='' />
      <div className='flex items-center gap-[30px] px-[20px] pt-[20px]'>
        <Image src='/assets/arrow_left.png' alt='' width={30} height={30} />
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Đánh giá và nhận xét</h3>
      </div>

      <RatingBar ratings={ratings} />

      <div className='p-[20px]'>
        <ReviewItem />
      </div>
    </div>
  );
};

export default page;
