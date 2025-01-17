import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryItem = ({ active }) => {
  return (
    <Link href='/search' className='relative flex flex-col gap-[4px] w-fit'>
      <Image
        src='/assets/cat_offer.png'
        alt=''
        width={100}
        height={100}
        className={`rounded-full justify-center border-[4px] border-solid ${
          active ? "border-[#fc6011]" : "border-[#e8e9e9]"
        }`}
      />
      <span className={`text-[16px] text-center font-semibold ${active ? "text-[#fc6011]" : "text-[#4A4B4D]"}`}>
        Hamburger
      </span>
      {active && (
        <Image
          src='/assets/check-box-circle-active.png'
          alt=''
          width={30}
          height={30}
          className='absolute top-[0px] right-[0px]'
        />
      )}
    </Link>
  );
};

export default CategoryItem;
