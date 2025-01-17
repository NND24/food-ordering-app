import Image from "next/image";
import React from "react";

const Pagination = () => {
  return (
    <div className='mt-5 w-full flex items-center justify-center'>
      <button className='pr-3 pl-2 py-2 mr-2 text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'>
        <Image src='/assets/arrow-left.png' alt='' width={20} height={20} />
      </button>
      <button className='px-3 py-2 mr-2 bg-[#fc6011] text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'>
        1
      </button>
      <span className='px-3 py-2 mr-2 text-[#4a4b4d]'>...</span>
      <button className='px-3 py-2 mr-2 text-[#4a4b4d] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'>
        2
      </button>
      <button className='pr-2 pl-3 py-2 mr-2 text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'>
        <Image src='/assets/arrow-right.png' alt='' width={20} height={20} />
      </button>
    </div>
  );
};

export default Pagination;
