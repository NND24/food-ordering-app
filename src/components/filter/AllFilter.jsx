import Image from "next/image";
import Link from "next/link";
import React from "react";
import FilterBy from "./FilterBy";
import RestaurantOptions from "./RestaurantOptions";
import FilterPrice from "./FilterPrice";
import DeliveryFee from "./DeliveryFee";

const AllFilter = ({ setOpenAllFilter }) => {
  return (
    <div className='pb-[160px] pt-[85px]'>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[20px] bg-[#fff] h-[85px] px-[20px]'>
        <Image src='/assets/close.png' alt='' width={25} height={25} onClick={setOpenAllFilter(false)} />
      </div>

      <FilterBy />
      <RestaurantOptions />
      <DeliveryFee />
      <FilterPrice />

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] px-[20px] py-[15px] m-[20px] w-[90%]'>
          <span className='text-[#fff] text-[20px] font-semibold'>Áp dụng</span>
        </div>
        <div className='flex items-center justify-center rounded-[8px] bg-[#fff] px-[20px] py-[15px] m-[20px] w-[90%] border border-[#a3a3a3a3] border-solid'>
          <span className='text-[#fc6011] text-[20px] font-semibold'>Làm mới</span>
        </div>
      </div>
    </div>
  );
};

export default AllFilter;
