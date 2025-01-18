import React from "react";

const OrderSummary = () => {
  return (
    <>
      <div className='pb-[20px] flex items-center justify-between'>
        <span className='text-[#4A4B4D] text-[18px] font-bold'>Tóm tắt đơn hàng</span>
      </div>

      <div className=' flex flex-col gap-[8px]'>
        <div className='flex gap-[15px] pb-[15px]' style={{ borderBottom: "1px solid #a3a3a3a3" }}>
          <div className='p-[8px] rounded-[6px] border border-[#a3a3a3a3] border-solid w-[40px] h-[40px]'>
            <span className='text-[#fc6011] font-semibold'>1x</span>
          </div>

          <div className='flex flex-1 justify-between'>
            <div className='flex flex-col'>
              <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Mì Quảng Thập Cẩm - Tô Lớn</h3>
              <p className='text-[#a4a5a8]'>Há cảo</p>
              <p className='text-[#a4a5a8]'>Chả</p>
            </div>
            <span className='text-[#4A4B4D]'>40.000đ</span>
          </div>
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
    </>
  );
};

export default OrderSummary;
