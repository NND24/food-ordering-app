"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DishBigCard = () => {
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
    <div className=''>
      <div className='relative flex flex-col gap-[4px] pt-[75%] w-full'>
        <Image
          src='/assets/res_1.png'
          alt=''
          layout='fill'
          objectFit='cover'
          className='rounded-[15px] justify-center'
        />

        {showChangeAmount ? (
          <div className='absolute bottom-[10%] right-[5%] flex items-center justify-center bg-[#fff] gap-[4px] border border-[#fc6011] border-solid rounded-full px-[8px] py-[4px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
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
            src='/assets/add_active.png'
            alt=''
            width={40}
            height={40}
            className='absolute bottom-[10%] right-[5%] bg-[#fff] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
            onClick={(e) => {
              e.preventDefault();
              setShowChangeAmount(!showChangeAmount);
            }}
          />
        )}
      </div>

      <div>
        <h4 className='text-[#4A4B4D] text-[20px] font-medium pt-[2px] line-clamp-1'>Minute by tuk tuk</h4>
        <p className='text-[#000] font-bold'>10.000đ</p>
      </div>
    </div>
  );
};

export default DishBigCard;
