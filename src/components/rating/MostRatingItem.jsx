import Image from "next/image";
import React from "react";

const MostRatingItem = ({ rating }) => {
  return (
    <div className='flex flex-col justify-between p-[20px] rounded-[8px] w-[85%] bg-[#fff] dark:bg-gray-800 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:w-full md:gap-[15px]'>
      <p className='text-[#000] dark:text-gray-100 text-[18px] line-clamp-1 md:line-clamp-2'>{rating.comment}</p>

      <div className='flex items-center gap-[8px]'>
        <Image src='/assets/star_active.png' alt='' width={15} height={15} />
        <span className='text-[#636464] dark:text-gray-400'>{rating.ratingValue}</span>
        <div className='w-[4px] h-[4px] rounded-full bg-[#636464] dark:bg-gray-400'></div>
        <span className='text-[#636464] dark:text-gray-400'>{rating.user.name}</span>
      </div>
    </div>
  );
};

export default MostRatingItem;
