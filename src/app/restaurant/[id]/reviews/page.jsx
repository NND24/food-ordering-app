import RatingBar from "@/components/RatingBar";
import Image from "next/image";
import React from "react";

const page = () => {
  const ratings = {
    5: 50,
    4: 30,
    3: 15,
    2: 5,
    1: 10,
  };

  return (
    <div>
      <div className='flex items-center gap-[30px] px-[20px] pt-[20px]'>
        <Image src='/assets/arrow-left.png' alt='' width={30} height={30} />
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Đánh giá và nhận xét</h3>
      </div>

      <div className='bg-[#e6e6e680] m-[20px] rounded-[8px]'>
        <div
          className='flex items-center gap-[6px] pb-[10px] px-[20px] pt-[20px]'
          style={{ borderBottom: "3px solid #fff" }}
        >
          <span className='text-[#4A4B4D] text-[24px] font-bold'>4.9</span>
          <Image src='/assets/star-active.png' alt='' width={20} height={20} />
          <span className='text-[#636464]'>{"(124 đánh giá)"}</span>
        </div>

        <div className='px-[20px] pt-[10px] pb-[20px]'>
          <RatingBar ratings={ratings} />
        </div>
      </div>

      <div className='p-[20px]'>
        <div className=''>
          <div className='flex items-center gap-[10px]'>
            <Image src='/assets/cat_offer.png' alt='' width={65} height={65} className='object-cover rounded-full' />

            <div className='flex flex-1 items-center justify-between'>
              <div className=''>
                <h4 className='text-[#4A4B4D] text-[24px] font-semibold'>Đạt Nguyễn</h4>
                <p className='text-[#636464]'>21 Nhận Xét</p>
              </div>

              <Image src='/assets/dots.png' alt='' width={30} height={30} />
            </div>
          </div>

          <div className='flex items-center gap-[8px] py-[10px]'>
            <div className='flex items-center gap-[4px]'>
              <Image src='/assets/star-active.png' alt='' width={15} height={15} />
              <Image src='/assets/star-active.png' alt='' width={15} height={15} />
              <Image src='/assets/star-active.png' alt='' width={15} height={15} />
              <Image src='/assets/star-active.png' alt='' width={15} height={15} />
              <Image src='/assets/star.png' alt='' width={15} height={15} />
              <Image src='/assets/star.png' alt='' width={15} height={15} />
            </div>
            <div className='w-[4px] h-[4px] rounded-full bg-[#636464]'></div>
            <span className='text-[#636464]'>6 ngày trước</span>
          </div>

          <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
            <Image
              src='/assets/m_res_1.png'
              alt=''
              layout='fill'
              objectFit='cover'
              className='rounded-[6px] justify-center'
            />
          </div>

          <p className='text-[#000] text-[18px] pt-[10px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit incidunt saepe omnis ducimus nulla, culpa
            minima eligendi dolorem magni amet vero, non atque quisquam sequi aliquam tempora provident obcaecati!
          </p>
          <p className='text-[#636464] pb-[10px] pt-[6px]'>Đã đặt: 1/2 con Vịt quay tiêu</p>
        </div>

        <div className='p-[20px] bg-[#e6e6e6] rounded-[8px]'>
          <p className='text-[#636464] text-[15px]'>6 ngày trước</p>
          <p className='text-[#000] font-bold py-[6px]'>Phản hồi từ quán</p>
          <p className='text-[#636464]'>Cảm ơn bạn đã đánh giá</p>
        </div>
      </div>
    </div>
  );
};

export default page;
