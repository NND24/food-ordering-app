"use client";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetDishQuery, useGetToppingFromDishQuery } from "../../../../../redux/features/dish/dishApi";
import ToppingItem from "../../../../../components/dish/ToppingItem";

const NoteModel = ({ setShowNoteModel }) => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-20'>
      <div className='bg-[#fff] rounded-[8px] w-[90%] z-30'>
        <div
          className='flex items-center gap-[30px] px-[20px] py-[20px]'
          style={{ borderBottom: "1px solid #a3a3a3a3" }}
        >
          <Image
            src='/assets/close.png'
            alt=''
            width={40}
            height={40}
            className='p-[8px] rounded-full bg-[#e0e0e0a3]'
            onClick={() => setShowNoteModel(false)}
          />
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Thêm lưu ý cho quán</h3>
        </div>
        <p className='text-[#4A4B4D] text-[18px] pt-[20px] px-[20px]'>Không bắt buộc</p>
        <textarea
          name=''
          id=''
          className='p-[20px] w-full'
          placeholder='Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán'
        ></textarea>
        <button className='bg-[#fc6011] text-[#fff] text-[18px] font-semibold w-[97%] p-[15px] rounded-[8px] mx-[20px] mb-[20px] cursor-pointer'>
          Xác Nhận
        </button>
      </div>

      <div
        className='fixed top-0 right-0 left-0 bottom-0 bg-[#0000008a] z-20'
        onClick={() => setShowNoteModel(false)}
      ></div>
    </div>
  );
};

const page = () => {
  const [value, setValue] = useState(1);
  const [showNoteModel, setShowNoteModel] = useState(false);

  const { id: storeId, dishId } = useParams();

  const { data: dishInfo } = useGetDishQuery(dishId);
  const { data: toppingGroups } = useGetToppingFromDishQuery(dishId);

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setValue((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue > 0 ? newValue : 1);
  };

  return (
    <>
      {dishInfo && (
        <div className='pb-[20px] md:pt-[75px] md:mt-[20px] md:bg-[#f9f9f9]'>
          <Heading title={dishInfo.data.name} description='' keywords='' />
          <div className='hidden md:block'>
            <Header />
          </div>

          <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
            <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-[20px] pt-[20px] md:hidden'>
              <Image
                src={dishInfo.data.image.url}
                alt=''
                width={40}
                height={40}
                className='p-[8px] rounded-full bg-[#e0e0e0a3]'
              />
            </div>

            <div className='relative pt-[50%] z-0 md:pt-[40%] lg:pt-[35%]'>
              <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='cover' />
            </div>

            <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              <div className='flex justify-between'>
                <h3 className='text-[#4A4B4D] text-[28px] font-bold'>{dishInfo.data.name}</h3>
                <span className='text-[#4A4B4D] text-[28px] font-bold'>{dishInfo.data.price}đ</span>
              </div>
              <p className='text-[#a4a5a8]'>{dishInfo.data.description}</p>
            </div>

            <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              {toppingGroups.data.map((toppingGroup) => (
                <div key={toppingGroup._id}>
                  <div className='flex gap-[10px]'>
                    <h3 className='text-[#4A4B4D] text-[20px] font-bold'>{toppingGroup.name}</h3>
                    <span className='text-[#a4a5a8]'>Không bắt buộc</span>
                  </div>
                  {toppingGroup.toppings.map((topping) => (
                    <ToppingItem key={topping._id} topping={topping} />
                  ))}
                </div>
              ))}
            </div>

            <div className='py-[20px]'>
              <div className='flex gap-[10px] px-[20px] pb-[20px]'>
                <h3 className='text-[#4A4B4D] text-[20px] font-bold'>Thêm lưu ý cho quán</h3>
                <span className='text-[#a4a5a8]'>Không bắt buộc</span>
              </div>
              <div
                className='p-[20px]'
                style={{ borderBottom: "1px solid #a3a3a3a3", borderTop: "1px solid #a3a3a3a3" }}
                onClick={() => setShowNoteModel(!showNoteModel)}
              >
                <span className='text-[#a4a5a8]'>Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán</span>
              </div>
            </div>

            <div className='p-[20px] flex items-center justify-center gap-[5px]'>
              <Image
                src='/assets/minus.png'
                alt=''
                width={50}
                height={50}
                onClick={handleDecrease}
                className='border border-[#a3a3a3a3] border-solid rounded-[6px] p-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] cursor-pointer'
              />
              <input
                type='number'
                value={value}
                onChange={handleChange}
                readOnly
                name=''
                id=''
                className='text-[#4A4B4D] text-[24px] font-bold w-[60px] text-center'
              />
              <Image
                src='/assets/plus_active.png'
                alt=''
                width={50}
                height={50}
                onClick={handleIncrease}
                className='border border-[#a3a3a3a3] border-solid rounded-[6px] p-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] cursor-pointer'
              />
            </div>
          </div>
        </div>
      )}

      {showNoteModel && dishInfo && <NoteModel setShowNoteModel={setShowNoteModel} />}
    </>
  );
};

export default page;
