import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import StarRating from "../../components/review/StarRating";

const ReviewItem = ({ rating, currentUser }) => {
  const [showOptionBox, setShowOptionBox] = useState(false);
  return (
    <div className='my-[15px]'>
      <div className='relative'>
        <div className='flex items-center gap-[10px]'>
          <Image src={rating.user.avatar.url} alt='' width={65} height={65} className='object-cover rounded-full' />

          <div className='flex flex-1 items-center justify-between'>
            <div className='flex flex-col flex-start h-full'>
              <h4 className='text-[#4A4B4D] text-[24px] font-semibold md:text-[20px]'>{rating.user.name}</h4>
              <div className='flex items-center gap-[8px]'>
                <StarRating ratingValue={rating.ratingValue} />
                <div className='w-[4px] h-[4px] rounded-full bg-[#636464]'></div>
                <span className='text-[#636464]'>{moment.utc(rating?.createdAt).local().fromNow()}</span>
              </div>
            </div>

            {rating.user._id === currentUser._id && (
              <Image
                src='/assets/dots.png'
                className='cursor-pointer'
                alt=''
                width={30}
                height={30}
                onClick={() => {
                  setShowOptionBox(!showOptionBox);
                }}
              />
            )}
            {showOptionBox && (
              <div className='absolute top-[0px] right-[35px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[6px] w-[150px] flex flex-col bg-white'>
                <span className='p-[6px] w-full rounded-[4px] hover:bg-[#00000011] cursor-pointer'>Chỉnh sửa</span>
                <span className='p-[6px] w-full rounded-[4px] hover:bg-[#00000011] cursor-pointer'>Xóa</span>
              </div>
            )}
          </div>
        </div>

        {rating.images.length > 0 && (
          <div className='flex flex-row gap-[10px]'>
            {rating.images.map((img) => (
              <div className='relative flex flex-col gap-[4px] w-[150px] pt-[150px]' key={img.filePath}>
                <Image src={img.url} alt='' layout='fill' objectFit='cover' className='rounded-[6px] justify-center' />
              </div>
            ))}
          </div>
        )}

        <p className='text-[#000] text-[18px] md:text-[16px] mt-[10px]'>{rating.comment}</p>
        <p className='text-[#636464] pb-[10px] pt-[6px] md:text-[14px] overflow-hidden text-ellipsis whitespace-nowrap'>
          Đã đặt:{" "}
          {rating.dishes.map((dish, index) => (
            <span key={index}>
              {dish.name}
              {index < rating.dishes.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      {/* <div className='px-[20px] py-[15px] bg-[#e6e6e6] rounded-[8px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[#000] font-bold md:text-[14px]'>Phản hồi từ quán</p>
          <p className='text-[#636464] text-[15px] md:text-[13px]'>6 ngày trước</p>
        </div>
        <p className='text-[#636464] md:text-[14px]'>Cảm ơn bạn đã đánh giá</p>
      </div> */}
    </div>
  );
};

export default ReviewItem;
