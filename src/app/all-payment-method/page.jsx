import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[85px] pb-[200px]'>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px]'>
        <Image src='/assets/left-arrow.png' alt='' width={30} height={30} />
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Tất cả phương thức thanh toán</h3>
      </div>

      <div className='p-[20px]'>
        {/* <div className='flex gap-[15px] mb-[20px]'>
          <Image src='/assets/money.png' alt='' width={30} height={30} />
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex items-center gap-[8px]'>
              <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Tiền mặt</h3>
            </div>
            <Image src='/assets/button-active.png' alt='' width={30} height={30} />
          </div>
        </div> */}

        <Link href='/all-payment-method/add-card' className='flex gap-[15px] mb-[20px]'>
          <Image src='/assets/credit-card.png' alt='' width={40} height={40} />
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex items-center gap-[8px]'>
              <h3 className='text-[#4A4B4D] text-[20px] font-bold'>Thẻ</h3>
            </div>
            <Image src='/assets/arrow-right.png' alt='' width={20} height={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
