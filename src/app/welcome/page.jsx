"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <div className='flex flex-col items-center h-screen'>
      {step === 1 ? (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_1.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
          </div>

          <h3 className='text-[#4A4B4D] text-[30px] text-center font-bold pb-[20px]'>Tìm đồ ăn bạn muốn</h3>

          <div className='text-[#636464] text-center my-[20px]'>
            <span>Discovery the best foods from over 1,000</span> <br />
            <span>restaurants and fast delivery to your</span> <br />
            <span>doorstep</span>
          </div>
        </div>
      ) : step === 2 ? (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_2.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
          </div>

          <h3 className='text-[#4A4B4D] text-[30px] text-center font-bold pb-[20px]'>Giao hàng nhanh chóng</h3>

          <div className='text-[#636464] text-center my-[20px]'>
            <span>Giao hàng đến tận nhà, cơ quan</span> <br />
            <span>bất cứ đâu bạn ở</span> <br />
            <span></span> <br />
          </div>
        </div>
      ) : (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_3.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
          </div>

          <h3 className='text-[#4A4B4D] text-[30px] text-center font-bold pb-[20px]'>Theo dõi trực tiếp vị trí</h3>

          <div className='text-[#636464] text-center my-[20px]'>
            <span>Theo dõi vị trí đồ ăn của bạn theo thời gian thực</span> <br />
            <span>từ trên ứng dụng một khi bạn đặt món</span> <br />
            <span></span> <br />
          </div>
        </div>
      )}

      <button
        className='text-center bg-[#fc6011] text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[20px] cursor-pointer'
        onClick={() => {
          if (step < 3) {
            setStep(step + 1);
          } else {
            router.push("/home");
          }
        }}
      >
        Tiếp
      </button>
    </div>
  );
};

export default page;
