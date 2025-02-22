import Image from "next/image";
import React from "react";

const FilterPrice = () => {
  return (
    <div>
      <div className='bg-[#e8e9e9] px-[20px] py-[15px] md:text-[20px] md:text-center md:px-4 md:py-2 md:font-semibold'>
        <span className='text-[#4A4B4D] mb-[10px]'>Giá</span>
      </div>

      <div className='flex gap-[15px] p-[20px] md:p-[10px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <div className='flex flex-1 items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>$</h3>
          <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/check_box_empty.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px] md:p-[10px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>$$</h3>
          </div>
          <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/check_box_checked.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px] md:p-[10px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>$$$</h3>
          </div>
          <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/check_box_checked.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px] md:p-[10px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>$$$$</h3>
          </div>
          <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/check_box_checked.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
