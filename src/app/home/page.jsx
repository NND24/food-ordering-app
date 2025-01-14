import React from "react";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import Category from "@/components/Category";
import Link from "next/link";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px]'>
      <div className='px-[20px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Xin chào Đạt</h3>
          <Link href='/notifications'>
            <Image src='/assets/notification.png' alt='' width={30} height={30} />
          </Link>
        </div>

        <div className='flex items-center bg-[#e8e9e9] text-[#636464] px-[20px] py-[10px] my-[30px] rounded-[8px] gap-[8px]'>
          <Image src='/assets/search.png' alt='' width={25} height={25} />
          <input type='text' name='' id='' placeholder='Tìm kiếm đồ ăn' className='bg-[#e8e9e9] text-[18px]' />
        </div>

        <Category />
      </div>

      <div className='my-[20px]'>
        <div className='flex items-center justify-between px-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Các nhà hàng nổi tiếng</h3>
          <Link href='' className='text-[#fc6011] text-[16px]'>
            Xem tất cả
          </Link>
        </div>

        <div>
          <Link href='restaurant/123' className='my-[20px]'>
            <div className='relative w-full pt-[45%]'>
              <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='fill' />
            </div>

            <h4 className='text-[#4A4B4D] text-[20px] font-semibold px-[20px] py-[4px]'>Minute by tuk tuk</h4>

            <div className='flex items-center gap-[10px] px-[20px]'>
              <div className='flex items-center gap-[6px]'>
                <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                <span className='text-[#fc6011]'>4.9</span>
                <span className='text-[#636464]'>{"(124 ratings)"}</span>
                <span className='text-[#636464]'>Cafe</span>
              </div>

              <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>

              <span className='text-[#636464]'>Western food</span>
            </div>
          </Link>
        </div>
      </div>

      <div className='my-[20px] px-[20px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[10px]'>Phổ biến nhất</h3>
          <Link href='' className='text-[#fc6011] text-[16px]'>
            Xem tất cả
          </Link>
        </div>

        <div className='flex items-center gap-[20px] overflow-x-auto whitespace-nowrap'>
          <div>
            <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
              <Image
                src='/assets/m_res_1.png'
                alt=''
                layout='fill'
                objectFit='cover'
                className='rounded-[6px] justify-center'
              />
            </div>

            <div>
              <h4 className='text-[#4A4B4D] text-[20px] font-semibold py-[4px]'>Minute by tuk tuk</h4>

              <div className='flex items-center gap-[10px]'>
                <div className='flex items-center gap-[6px]'>
                  <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                  <span className='text-[#fc6011]'>4.9</span>
                  <span className='text-[#636464]'>{"(124 ratings)"}</span>
                  <span className='text-[#636464]'>Cafe</span>
                </div>

                <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>

                <span className='text-[#636464]'>Western food</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='my-[20px] px-[20px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Quán cơm</h3>
          <Link href='' className='text-[#fc6011] text-[16px]'>
            Xem tất cả
          </Link>
        </div>

        <div className='flex gap-[25px] my-[20px] items-start'>
          <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
            <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>

          <div className='flex flex-1 items-start justify-between'>
            <div className='flex flex-col'>
              <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

              <div className='flex items-center gap-[10px]'>
                <span className='text-[#636464]'>Cafe</span>
                <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                <span className='text-[#636464]'>Western food</span>
              </div>

              <div className='flex items-center gap-[6px]'>
                <Image src='/assets/star-active.png' alt='' width={20} height={20} />
                <span className='text-[#fc6011]'>4.9</span>
                <span className='text-[#636464]'>{"(124 ratings)"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavBar page='home' />
    </div>
  );
};

export default page;
