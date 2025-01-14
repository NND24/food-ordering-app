"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Mảng chứa giá trị OTP

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Chỉ chấp nhận số

    const newOtp = [...otp];
    newOtp[index] = value; // Cập nhật giá trị OTP tại vị trí index
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Quay lại ô trước nếu ô hiện tại không có giá trị và người dùng nhấn Backspace
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className='flex flex-col items-center py-[50px] h-screen'>
      <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Nhập mã OTP</h3>
      <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

      <div className='text-[#636464] text-center my-[20px]'>
        <span>Vui lòng kiểm tra số điện thoại 0935****53</span> <br />
        <span>để tiếp tục lấy lại mật khẩu</span> <br />
      </div>

      {/* Form nhập OTP */}
      <div className='flex space-x-6 my-4'>
        {otp.map((_, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type='text'
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder='*'
            className='w-[50px] h-[50px] text-center text-xl border-2 border-[#ccc] border-solid rounded-lg bg-[#e8e9e9] text-[#636464]'
          />
        ))}
      </div>

      <Link
        href='/reset-password'
        className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] cursor-pointer'
      >
        Tiếp
      </Link>

      <p className='text-[#636464] font-semibold mt-[20px]'>
        Không nhận được mã?{" "}
        <Link href='/register' className='text-[#fc6011] cursor-pointer'>
          Nhấn vào đây
        </Link>
      </p>
    </div>
  );
};

export default page;
