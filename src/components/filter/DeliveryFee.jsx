import Image from "next/image";
import React from "react";

const DeliveryFee = () => {
  return (
    <div>
      <div className='bg-[#e8e9e9] px-[20px] py-[15px]'>
        <span className='text-[#4A4B4D] text-[24px] mb-[10px] font-bold'>Phí giao hàng</span>
      </div>

      <div className='flex gap-[15px] p-[20px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <Image src='/assets/credit-card.png' alt='' width={30} height={30} />
        <div className='flex flex-1 items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[20px] font-medium'>Tất</h3>
          <Image src='/assets/button.png' alt='' width={30} height={30} />
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <Image src='/assets/money.png' alt='' width={30} height={30} />
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium'>Thấp hơn 15.000đ</h3>
          </div>
          <Image src='/assets/button-active.png' alt='' width={30} height={30} />
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <Image src='/assets/money.png' alt='' width={30} height={30} />
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium'>Thấp hơn 20.000đ</h3>
          </div>
          <Image src='/assets/button-active.png' alt='' width={30} height={30} />
        </div>
      </div>

      <div className='flex gap-[15px] p-[20px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
        <Image src='/assets/money.png' alt='' width={30} height={30} />
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium'>Thấp hơn 25.000đ</h3>
          </div>
          <Image src='/assets/button-active.png' alt='' width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryFee;
