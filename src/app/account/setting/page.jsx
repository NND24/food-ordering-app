"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import NavBar from "../../../components/NavBar";
import Heading from "../../../components/Heading";
import ThemeToggle from "../../../components/ThemeToggle";

export default function ThemeSettingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className='pt-[40px] pb-[100px] px-[20px] md:pt-[100px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors'>
      <Heading title='Cài đặt' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='setting' />
      </div>

      <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-300 dark:md:border-gray-700 rounded-[10px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-[20px] transition-all duration-300'>
        <div className='flex flex-col gap-6'>
          <h3 className='text-[26px] font-bold text-center mb-4'>Cài đặt</h3>

          <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3'>
            <span className='text-[18px] font-medium'>Chỉnh nền hiển thị</span>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>

      <div className='block md:hidden'>
        <NavBar page='setting' />
      </div>
    </div>
  );
}
