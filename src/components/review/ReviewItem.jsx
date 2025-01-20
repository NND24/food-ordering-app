import Image from "next/image";
import React from "react";

const ReviewItem = () => {
  return (
    <div>
      <div className=''>
        <div className='flex items-center gap-[10px]'>
          <Image src='/assets/cat_offer.png' alt='' width={65} height={65} className='object-cover rounded-full' />

          <div className='flex flex-1 items-center justify-between'>
            <div className=''>
              <h4 className='text-[#4A4B4D] text-[24px] font-semibold md:text-[20px]'>Đạt Nguyễn</h4>
              <p className='text-[#636464]'>21 Nhận Xét</p>
            </div>

            <Image src='/assets/dots.png' alt='' width={30} height={30} />
          </div>
        </div>

        <div className='flex items-center gap-[8px] py-[10px]'>
          <div className='flex items-center gap-[4px]'>
            <Image src='/assets/star_active.png' alt='' width={15} height={15} />
            <Image src='/assets/star_active.png' alt='' width={15} height={15} />
            <Image src='/assets/star_active.png' alt='' width={15} height={15} />
            <Image src='/assets/star_active.png' alt='' width={15} height={15} />
            <Image src='/assets/star.png' alt='' width={15} height={15} />
            <Image src='/assets/star.png' alt='' width={15} height={15} />
          </div>
          <div className='w-[4px] h-[4px] rounded-full bg-[#636464]'></div>
          <span className='text-[#636464]'>6 ngày trước</span>
        </div>

        <div className='relative flex flex-col gap-[4px] w-[150px] pt-[150px]'>
          <Image
            src='/assets/m_res_1.png'
            alt=''
            layout='fill'
            objectFit='cover'
            className='rounded-[6px] justify-center'
          />
        </div>

        <p className='text-[#000] text-[18px] pt-[10px] md:text-[16px]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit incidunt saepe omnis ducimus nulla, culpa
          minima eligendi dolorem magni amet vero, non atque quisquam sequi aliquam tempora provident obcaecati!
        </p>
        <p className='text-[#636464] pb-[10px] pt-[6px] md:text-[14px]'>Đã đặt: 1/2 con Vịt quay tiêu</p>
      </div>

      <div className='px-[20px] py-[15px] bg-[#e6e6e6] rounded-[8px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[#000] font-bold md:text-[14px]'>Phản hồi từ quán</p>
          <p className='text-[#636464] text-[15px] md:text-[13px]'>6 ngày trước</p>
        </div>
        <p className='text-[#636464] md:text-[14px]'>Cảm ơn bạn đã đánh giá</p>
      </div>
    </div>
  );
};

export default ReviewItem;
