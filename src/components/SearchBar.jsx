import Image from "next/image";
import React from "react";

const SearchBar = () => {
  return (
    <div className='relative bg-[#e8e9e9] text-[#636464] w-full pl-[40px] pr-[20px] py-[10px] my-[30px] rounded-[8px] md:py-[5px] md:m-0 md:w-[90%] lg:w-[60%]'>
      <Image
        src='/assets/search.png'
        alt=''
        width={20}
        height={20}
        className='absolute top-[50%] translate-y-[-50%] left-[10px]'
      />
      <input type='search' name='' id='' placeholder='Tìm kiếm đồ ăn' className='bg-[#e8e9e9] text-[18px] w-full' />
    </div>
  );
};

export default SearchBar;
