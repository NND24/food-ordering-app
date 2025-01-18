import Header from "@/components/Header";
import OrderSummary from "@/components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[20px] pb-[140px] md:bg-[#f9f9f9] md:pt-[110px]'>
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static md:gap-[20px]'>
          <div className='relative w-[30px] pt-[30px] md:hidden'>
            <Image src='/assets/left-arrow.png' alt='' layout='fill' objectFit='contain' />
          </div>
          <div className='relative w-[70px] pt-[70px] hidden md:block'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>
          <div>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Gà quay Thiên Phúc</h3>
            <p className='text-[#636464]'>Khoảng cách tới chỗ bạn 6,9km</p>
          </div>
        </div>

        <div
          className='p-[20px] mt-[85px] md:mt-0'
          style={{ borderBottom: "6px solid #e0e0e0a3", borderTop: "6px solid #e0e0e0a3" }}
        >
          <p className='text-[#4A4B4D] text-[18px] font-bold pb-[20px]'>Giao tới</p>

          <div className=' flex flex-col gap-[15px]'>
            <div className='flex gap-[15px]'>
              <Image src='/assets/map_pin.png' alt='' width={20} height={20} className='object-contain' />
              <div className='flex flex-1 items-center justify-between'>
                <div>
                  <h3 className='text-[#4A4B4D] text-[18px] font-bold'>175 Nguyễn Chí Thanh</h3>
                  <p className='text-[#a4a5a8] line-clamp-1'>
                    175 Nguyễn Chí Thanh, Xã EaTu, Tp.Buôn Ma Thuột, Đăk Lăk
                  </p>
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
          <OrderSummary />
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
            <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/credit-card.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <div className='flex flex-1 items-center justify-between'>
              <div className='flex items-center gap-[8px]'>
                <h3 className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Thẻ</h3>
                <span className='text-[#a4a5a8] px-[8px] py-[6px] rounded-full bg-[#e0e0e0a3] md:text-[14px] md:px-[6px]'>
                  Đề xuất
                </span>
              </div>
              <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px] cursor-pointer'>
                <Image src='/assets/button.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </div>

          <div className='flex gap-[15px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/money.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <div className='flex flex-1 items-center justify-between'>
              <div className='flex items-center gap-[8px]'>
                <h3 className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Tiền mặt</h3>
              </div>
              <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px] cursor-pointer'>
                <Image src='/assets/button-active.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </div>
        </div>

        <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
          <span className='text-[#4A4B4D] text-[18px] font-bold'>Ưu đãi</span>

          <Link href='/restaurant/123/coupons' className='flex gap-[15px] mb-[10px] mt-[20px]'>
            <div className='relative w-[30px] pt-[30px]'>
              <Image src='/assets/marketing.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <div className='flex flex-1 items-center justify-between'>
              <span className='text-[#4A4B4D] text-[18px]'>Sử dụng ưu đãi hoặc mã khuyến mãi</span>
              <div className='relative w-[20px] pt-[20px]'>
                <Image src='/assets/arrow-right.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </Link>
        </div>

        <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
          <span className='text-[#4A4B4D] text-[16px]'>
            Bằng việc đặt đơn này, bạn đã đồng ý Điều khoản Sử dụng và Quy chế hoạt động của chúng tôi
          </span>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] p-[15px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='flex items-center justify-between pb-[8px] lg:w-[60%] md:w-[80%] md:mx-auto'>
          <span className='text-[#000] text-[18px]'>Tổng cộng</span>
          <span className='text-[#4A4B4D] text-[24px] font-semibold'>150.000đ</span>
        </div>
        <Link
          href='/orders/order/123'
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[10px] md:px-[10px]  lg:w-[60%] md:w-[80%] md:mx-auto'
        >
          <span className='text-[#fff] text-[20px] font-semibold md:text-[18px]'>Đặt đơn</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
