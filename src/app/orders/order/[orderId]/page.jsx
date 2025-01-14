import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pb-[140px]'>
      <div className='flex items-center justify-between px-[20px] py-[20px]'>
        <Image
          src='/assets/left-arrow.png'
          alt=''
          width={40}
          height={40}
          className='p-[8px] rounded-full bg-[#e0e0e0a3]'
        />
      </div>

      <div className='m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>16:15 - 16:25</h3>
        <span className='text-[#a4a5a8] text-[18px]'>Đang sắp xếp đơn hàng</span>

        <div className='relative flex items-center justify-between py-[10px]'>
          <Image src='/assets/start-active.png' alt='' width={25} height={25} />
          <div className='absolute top-[45%] left-[9%] h-[4px] w-[20%] bg-[#fc6011] rounded-[4px]'></div>
          <Image src='/assets/cooking.png' alt='' width={25} height={25} />
          <div className='absolute top-[45%] left-[40%] h-[4px] w-[20%] bg-[#a4a5a8] rounded-[4px]'></div>
          <Image src='/assets/delivery.png' alt='' width={25} height={25} />
          <div className='absolute top-[45%] right-[10%] h-[4px] w-[20%] bg-[#a4a5a8] rounded-[4px]'></div>
          <Image src='/assets/home.png' alt='' width={25} height={25} />
        </div>
      </div>

      <div className='flex flex-col gap-[15px] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex gap-[15px]'>
          <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center gap-[6px]'>
              <span className='text-[#4A4B4D] text-[20px] font-bold'>Nguyễn Văn A</span>
              <span className='text-[#4A4B4D] text-[16px] font-medium'>4.9</span>
              <Image src='/assets/star-active.png' alt='' width={20} height={20} />
            </div>
            <div className='flex items-center gap-[6px]'>
              <span className='text-[#a4a5a8]'>Yamaha Exciter</span>
              <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
              <span className='text-[#a4a5a8]'>47AC-98745</span>
            </div>
          </div>
        </div>

        <div className='flex items-center gam-[20px] p-[10px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <div className='flex-1 flex justify-center' style={{ borderRight: "1px solid #e0e0e0a3" }}>
            <Image src='/assets/phone.png' alt='' width={30} height={30} className='object-contain' />
          </div>
          <div className='flex-1 flex justify-center'>
            <Image src='/assets/send.png' alt='' width={30} height={30} className='object-contain' />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[15px] m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex gap-[15px]'>
          <div className='relative flex flex-col gap-[4px] min-w-[70px] pt-[20%]'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>

          <div className='flex flex-col'>
            <h4 className='text-[#4A4B4D] text-[24px] font-medium pt-[2px] line-clamp-1'>Gà quay Thiên Phúc</h4>
            <p className='text-[#a4a5a8]'>Cách 6.5km</p>
          </div>
        </div>

        <div className='flex items-center gam-[20px] p-[10px]' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <div className='flex-1 flex justify-center' style={{ borderRight: "1px solid #e0e0e0a3" }}>
            <Image src='/assets/phone.png' alt='' width={30} height={30} className='object-contain' />
          </div>
          <div className='flex-1 flex justify-center'>
            <Image src='/assets/send.png' alt='' width={30} height={30} className='object-contain' />
          </div>
        </div>
      </div>

      <div className='m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='pb-[20px] flex items-center justify-between'>
          <span className='text-[#4A4B4D] text-[16px] font-bold'>Tóm tắt đơn hàng</span>
        </div>

        <div className=' flex flex-col gap-[8px]'>
          <div className='flex justify-between gap-[15px] pb-[15px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
            <div className='p-[8px] rounded-[6px] border border-[#a3a3a3a3] border-solid w-[40px] h-[40px]'>
              <span className='text-[#fc6011] font-semibold'>1x</span>
            </div>

            <div className='flex flex-col'>
              <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Mì Quảng Thập Cẩm - Tô Lớn</h3>
              <p className='text-[#a4a5a8]'>Há cảo</p>
              <p className='text-[#a4a5a8]'>Chả</p>
            </div>
            <span className='text-[#4A4B4D]'>40.000đ</span>
          </div>

          <div className='pt-[15px]'>
            <div className='flex items-center justify-between'>
              <span className='text-[#4A4B4D]'>Tổng tạm tính</span>
              <span className='text-[#4A4B4D]'>40.000đ</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-[#4A4B4D]'>Phí áp dụng</span>
              <span className='text-[#4A4B4D]'>40.000đ</span>
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <Link
          href='/orders/order/123'
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] m-[20px] w-[90%]'
        >
          <span className='text-[#fff] text-[20px] font-semibold'>Theo dõi vị trí đơn hàng</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
