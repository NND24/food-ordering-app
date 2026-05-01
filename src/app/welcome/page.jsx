"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

const page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center h-screen bg-white dark:bg-gray-900'>
      {step === 1 ? (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_1.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
          </div>

          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[30px] text-center font-bold pb-[20px]'>{t("welcome.step1Title")}</h3>

          <div className='text-[#636464] dark:text-gray-400 text-center my-[20px]'>
            <span>{t("welcome.step1Desc")}</span>
          </div>
        </div>
      ) : step === 2 ? (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_2.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
          </div>

          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[30px] text-center font-bold pb-[20px]'>{t("welcome.step2Title")}</h3>

          <div className='text-[#636464] dark:text-gray-400 text-center my-[20px]'>
            <span>{t("welcome.step2Desc")}</span>
          </div>
        </div>
      ) : (
        <div>
          <div className='relative h-[50vh] w-[100%]'>
            <Image src='/assets/on_boarding_3.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='flex gap-3 items-center justify-center mt-[20px] mb-[20px]'>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#e8e9e9] dark:bg-gray-600'></div>
            <div className='w-[10px] h-[10px] rounded-full bg-[#fc6011]'></div>
          </div>

          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[30px] text-center font-bold pb-[20px]'>{t("welcome.step3Title")}</h3>

          <div className='text-[#636464] dark:text-gray-400 text-center my-[20px]'>
            <span>{t("welcome.step3Desc")}</span>
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
        {t("welcome.next")}
      </button>
    </div>
  );
};

export default page;
