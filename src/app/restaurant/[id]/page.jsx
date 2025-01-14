"use client";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
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
    <div className={`${showChangeAmount ? "pb-[120px]" : "pb-[20px]"}`}>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-[20px] pt-[20px]'>
        <Image src='/assets/arrow-left-white.png' alt='' width={30} height={30} />
        <div className='flex items-center gap-[20px]'>
          <Image src='/assets/favorite-white.png' alt='' width={30} height={30} />
          <Image src='/assets/notification-white.png' alt='' width={30} height={30} />
        </div>
      </div>

      <div className='relative pt-[50%] z-0'>
        <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='cover' />
      </div>

      <div className='flex gap-[25px] my-[20px] mx-[20px] items-start bg-[#fff] translate-y-[-60%] mb-[-10%] p-[10px] rounded-[6px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
          <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
        </div>

        <div className='flex flex-1 items-start justify-between'>
          <div className='flex flex-col'>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

            <div className='flex items-center gap-[10px]'>
              <span className='text-[#636464]'>Cafe</span>
              <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
              <span className='text-[#636464]'>Western food</span>
            </div>

            <div className='flex items-center gap-[6px]'>
              <Image src='/assets/star-active.png' alt='' width={20} height={20} />
              <span className='text-[#fc6011]'>4.9</span>
              <span className='text-[#636464]'>{"(124 ratings)"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-[20px]'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[10px]'>Dành cho bạn</h3>

        <div className='grid gap-4 grid-cols-2'>
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
                  src='/assets/add-active.png'
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
        </div>
      </div>

      <div className='p-[20px]'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[5px]'>Mì xào</h3>

        <Link
          href='/restaurant/123/dish/321'
          className='flex gap-[15px] items-start py-[15px]'
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
      </div>

      <div className='px-[20px] bg-[#e6e6e6]'>
        <div className='flex items-center justify-between pb-[10px] pt-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[10px]'>Mọi người nhận xét</h3>
          <Link href='/restaurant/123/reviews'>
            <Image
              src='/assets/right-arrows.png'
              alt=''
              width={40}
              height={40}
              className='bg-[#fff] p-[8px] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
            />
          </Link>
        </div>

        <div className='flex items-center gap-[20px] overflow-x-auto whitespace-nowrap pb-[20px]'>
          <div className='flex flex-col justify-between p-[20px] rounded-[8px] w-[85%] h-[110px] bg-[#fff] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
            <p className='text-[#000] text-[18px] line-clamp-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit incidunt saepe omnis ducimus nulla,
              culpa minima eligendi dolorem magni amet vero, non atque quisquam sequi aliquam tempora provident
              obcaecati!
            </p>

            <div className='flex items-center gap-[8px]'>
              <Image src='/assets/star-active.png' alt='' width={15} height={15} />
              <span className='text-[#636464]'>5</span>
              <div className='w-[4px] h-[4px] rounded-full bg-[#636464]'></div>
              <span className='text-[#636464]'>Đạt Nguyễn</span>
            </div>
          </div>
        </div>
      </div>

      <Link href='/restaurant/123/cart/321' className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <div className='flex items-center justify-between rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] m-[20px] w-[90%]'>
          <div className='flex items-center gap-[8px]'>
            <span className='text-[#fff] text-[20px] font-semibold'>Giỏ hàng</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#fff]'></div>
            <span className='text-[#fff] text-[20px] font-semibold'>1 món</span>
          </div>
          <span className='text-[#fff] text-[20px] font-semibold'>150.000đ</span>
        </div>
      </Link>
    </div>
  );
};

export default page;
