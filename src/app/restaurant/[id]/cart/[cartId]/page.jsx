import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[20px] pb-[140px]'>
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px]'>
        <Image src='/assets/left-arrow.png' alt='' width={30} height={30} />
        <div>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Gà quay Thiên Phúc</h3>
          <p className='text-[#636464]'>Khoảng cách tới chỗ bạn 6,9km</p>
        </div>
      </div>

      <div
        className='p-[20px] mt-[85px]'
        style={{ borderBottom: "6px solid #e0e0e0a3", borderTop: "6px solid #e0e0e0a3" }}
      >
        <p className='text-[#4A4B4D] text-[18px] font-bold pb-[20px]'>Giao tới</p>

        <div className=' flex flex-col gap-[15px]'>
          <div className='flex gap-[15px]'>
            <Image src='/assets/map_pin.png' alt='' width={20} height={20} className='object-contain' />
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[#4A4B4D] text-[18px] font-bold'>175 Nguyễn Chí Thanh</h3>
                <p className='text-[#a4a5a8] line-clamp-1'>175 Nguyễn Chí Thanh, Xã EaTu, Tp.Buôn Ma Thuột, Đăk Lăk</p>
              </div>
              <Image src='/assets/arrow-right.png' alt='' width={20} height={20} />
            </div>
          </div>

          <div className='p-[10px] rounded-[6px] flex items-center justify-between bg-[#e0e0e0a3]'>
            <span className='text-[#4A4B4D]'>Thêm chi tiết địa chỉ và hướng dẫn giao hàng</span>
            <span className='text-[#0054ff] font-semibold'>Thêm</span>
          </div>
        </div>
      </div>

      <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
        <div className='pb-[20px] flex items-center justify-between'>
          <span className='text-[#4A4B4D] text-[18px] font-bold'>Tóm tắt đơn hàng</span>
          <span className='text-[#0054ff] font-semibold'>Thêm</span>
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
              <span className='text-[#0054ff] font-semibold'>Chỉnh sửa</span>
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

      <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
        <div className='pb-[20px] flex items-center justify-between'>
          <span className='text-[#4A4B4D] text-[18px] font-bold'>Thông tin thanh toán</span>
          <span className='text-[#0054ff] font-semibold'>Xem tất cả</span>
        </div>

        <p className='pb-[20px] text-[#4A4B4D]'>
          Vì lý do an toàn, tài xế sẽ ưu tiên nhận đơn hàng thanh toán không dùng tiền mặt. Chuyển phương thức thanh
          toán sang dạng thẻ / ví để tìm thấy tài xế nhanh hơn.
        </p>

        <div className='flex gap-[15px] mb-[10px]'>
          <Image src='/assets/credit-card.png' alt='' width={30} height={30} />
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex items-center gap-[8px]'>
              <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Thẻ</h3>
              <span className='text-[#a4a5a8] px-[8px] py-[6px] rounded-full bg-[#e0e0e0a3]'>Đề xuất</span>
            </div>
            <Image src='/assets/button.png' alt='' width={30} height={30} />
          </div>
        </div>

        <div className='flex gap-[15px]'>
          <Image src='/assets/money.png' alt='' width={30} height={30} />
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex items-center gap-[8px]'>
              <h3 className='text-[#4A4B4D] text-[18px] font-bold'>Tiền mặt</h3>
            </div>
            <Image src='/assets/button-active.png' alt='' width={30} height={30} />
          </div>
        </div>
      </div>

      <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
        <span className='text-[#4A4B4D] text-[18px] font-bold'>Ưu đãi</span>

        <Link href='/restaurant/123/coupons' className='flex gap-[15px] mb-[10px] mt-[20px]'>
          <Image src='/assets/marketing.png' alt='' width={30} height={30} className='object-contain' />
          <span className='text-[#4A4B4D] text-[18px]'>Sử dụng ưu đãi hoặc mã khuyến mãi</span>
          <Image src='/assets/arrow-right.png' alt='' width={20} height={20} className='object-contain' />
        </Link>
      </div>

      <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
        <span className='text-[#4A4B4D] text-[16px]'>
          Bằng việc đặt đơn này, bạn đã đồng ý Điều khoản Sử dụng và Quy chế hoạt động của chúng tôi
        </span>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
        <div className='flex items-center justify-between px-[20px]'>
          <span className='text-[#000] text-[18px]'>Tổng cộng</span>
          <span className='text-[#4A4B4D] text-[24px] font-semibold'>150.000đ</span>
        </div>
        <Link
          href='/orders/order/123'
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] m-[20px] w-[90%]'
        >
          <span className='text-[#fff] text-[20px] font-semibold'>Đặt đơn</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
