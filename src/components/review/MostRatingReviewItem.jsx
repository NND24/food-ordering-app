import Image from "next/image";
import React from "react";

const MostRatingReviewItem = () => {
  return (
    <div className='flex flex-col justify-between p-[20px] rounded-[8px] w-[85%] bg-[#fff] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:w-full md:gap-[15px]'>
      <p className='text-[#000] text-[18px] line-clamp-1 md:line-clamp-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit incidunt saepe omnis ducimus nulla, culpa
        minima eligendi dolorem magni amet vero, non atque quisquam sequi aliquam tempora provident obcaecati!
      </p>

      <div className='flex items-center gap-[8px]'>
        <Image src='/assets/star_active.png' alt='' width={15} height={15} />
        <span className='text-[#636464]'>5</span>
        <div className='w-[4px] h-[4px] rounded-full bg-[#636464]'></div>
        <span className='text-[#636464]'>Đạt Nguyễn</span>
      </div>
    </div>
  );
};

export default MostRatingReviewItem;
