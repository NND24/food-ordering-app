"use client";
import Header from "../components/header/Header";
import Heading from "../components/Heading";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='bg-white dark:bg-gray-900 min-h-screen'>
      <Heading title='Không tìm thấy trang' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='md:w-[90%] md:mx-auto px-[20px]'>
        <div className='flex flex-col items-center text-center pt-[150px] gap-6'>
          <h1 className='text-6xl font-bold text-[#fc6011]'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Trang không tồn tại</h2>
          <p className='text-gray-500 dark:text-gray-400'>Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link
            href='/home'
            className='px-6 py-3 bg-[#fc6011] text-white rounded-lg font-semibold hover:bg-[#e0560f] transition shadow-md'
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
