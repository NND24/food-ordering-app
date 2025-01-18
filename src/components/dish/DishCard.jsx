"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DishCard = () => {
  const [value, setValue] = useState(1);
  const [showChangeAmount, setShowChangeAmount] = useState(false);

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : 1));
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue > 0 ? newValue : 1);
  };

  useEffect(() => {
    if (value === 0) {
      setShowChangeAmount(false);
    }
  }, [value]);

  return (
    <Link
      href='/restaurant/123/dish/321'
      className='flex gap-[15px] items-start pb-[15px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:p-[10px]'
      style={{ borderBottom: "1px solid #a3a3a3a3" }}
    >
      <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
        <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
      </div>

      <div className='flex flex-col flex-1'>
        <h4 className='text-[#4A4B4D] text-[20px] font-medium pt-[2px] line-clamp-1'>Minute by tuk tuk</h4>
        <p className='text-[#a4a5a8] text-[14px]'>Sợi mì dai ngon</p>
        <div className='flex items-center justify-between'>
          <span className='text-[#000] font-bold'>10.000đ</span>
          {showChangeAmount ? (
            <div className='flex items-center justify-center bg-[#fff] gap-[4px] border border-[#fc6011] border-solid rounded-full px-[8px] py-[4px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
              <Image
                src='/assets/minus.png'
                alt=''
                width={20}
                height={20}
                onClick={(e) => {
                  e.preventDefault();
                  handleDecrease();
                }}
                className=''
              />
              <input
                type='number'
                value={value}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange();
                }}
                name=''
                id=''
                className='text-[#4A4B4D] text-[20px] font-bold w-[40px] text-center'
              />
              <Image
                src='/assets/plus.png'
                alt=''
                width={20}
                height={20}
                onClick={(e) => {
                  e.preventDefault();
                  handleIncrease();
                }}
                className=''
              />
            </div>
          ) : (
            <Image
              src='/assets/add-active.png'
              alt=''
              width={40}
              height={40}
              className='bg-[#fff] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
              onClick={(e) => {
                e.preventDefault();
                setShowChangeAmount(!showChangeAmount);
              }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default DishCard;