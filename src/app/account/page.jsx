import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Tài khoản</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <Link href='profile' className='flex gap-[15px] my-[20px] cursor-pointer'>
        <Image src='/assets/cat_offer.png' alt='' width={60} height={60} className='object-cover rounded-[6px]' />

        <div className='flex flex-1 justify-between items-center'>
          <div className=''>
            <p className='text-[#4A4B4D] text-[22px] font-semibold pb-[4px]'>Nguyễn Ngọc Đạt</p>
            <p className='text-[#636464] text-[16px]'>0952369874</p>
          </div>

          <Image src='/assets/pencil.png' alt='' width={30} height={30} />
        </div>
      </Link>

      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Thông báo</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>
      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Yêu thích</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>
      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Địa chỉ</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>
      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Phương thức thanh toán</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>
      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Cài đặt</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>
      <div className='flex items-center justify-between border border-[#a3a3a3a3] border-solid rounded-[8px] px-[8px] py-[12px] my-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
          <span className='text-[#4A4B4D] text-[20px] font-semibold pb-[4px]'>Cài đặt</span>
        </div>
        <Image src='/assets/right-arrow.png' alt='' width={25} height={25} />
      </div>

      <button className='bg-[#fc6011] text-[#fff] font-semibold w-full p-[20px] rounded-full my-[10px] cursor-pointer shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        Đăng Xuất
      </button>

      <NavBar page='account' />
    </div>
  );
};

export default page;
