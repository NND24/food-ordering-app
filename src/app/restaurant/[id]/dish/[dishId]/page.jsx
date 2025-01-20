"use client";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Đánh giá và nhận xét</h3>
        </div>
        <p className='text-[#4A4B4D] text-[18px] pt-[20px] px-[20px]'>Không bắt buộc</p>
        <textarea
          name=''
          id=''
          className='p-[20px] w-full'
          placeholder='Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán'
        ></textarea>
        <button className='bg-[#fc6011] text-[#fff] text-[18px] font-semibold w-[89%] p-[15px] rounded-[8px] mx-[20px] mb-[20px] cursor-pointer'>
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
  const [check, setCheck] = useState(false);

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
      <div className='pb-[20px] md:pt-[75px] md:mt-[20px] md:bg-[#f9f9f9]'>
        <Heading title='Món ăn' description='' keywords='' />
        <div className='hidden md:block'>
          <Header />
        </div>

        <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-[20px] pt-[20px] md:hidden'>
            <Image
              src='/assets/close.png'
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
              <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Các nhà hàng nổi tiếng</h3>
              <span className='text-[#4A4B4D] text-[28px] font-bold'>10.000đ</span>
            </div>
            <p className='text-[#a4a5a8]'>Sợi mì dai ngon</p>
          </div>

          <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
            <div className='flex gap-[10px]'>
              <h3 className='text-[#4A4B4D] text-[20px] font-bold'>Thêm</h3>
              <span className='text-[#a4a5a8]'>Không bắt buộc</span>
            </div>

            <div
              className='flex items-center justify-between py-[20px]'
              style={{ borderBottom: "1px solid #a3a3a3a3" }}
              onClick={() => setCheck(!check)}
            >
              <div className='flex items-center gap-[20px]'>
                {check ? (
                  <Image src='/assets/check_box_checked.png' alt='' width={21} height={21} />
                ) : (
                  <Image src='/assets/check_box_empty.png' alt='' width={20} height={20} />
                )}
                <h3 className='text-[#4A4B4D] text-[18px]'>Cơm thêm</h3>
              </div>

              <span className='text-[#4A4B4D] text-[18px]'>+7.000đ</span>
            </div>
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
              name=''
              id=''
              className='text-[#4A4B4D] text-[24px] font-bold w-[60px] text-center'
            />
            <Image
              src='/assets/plus.png'
              alt=''
              width={50}
              height={50}
              onClick={handleIncrease}
              className='border border-[#a3a3a3a3] border-solid rounded-[6px] p-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] cursor-pointer'
            />
          </div>
        </div>
      </div>

      {showNoteModel && <NoteModel setShowNoteModel={setShowNoteModel} />}
    </>
  );
};

export default page;
