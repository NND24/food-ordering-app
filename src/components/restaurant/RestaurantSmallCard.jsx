import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantSmallCard = ({ store }) => {
  return (
    <Link href={`/restaurant/${store._id}`} className='flex gap-[10px] items-start'>
      <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px]'>
        <Image src={store.avatar.url} alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
      </div>

      <div className='flex flex-1 items-start justify-between'>
        <div className='flex flex-col'>
          <span className='text-[#4A4B4D] text-[18px] font-semibold line-clamp-1'>{store.name}</span>

          <div className='flex items-center gap-[4px] w-full'>
            {store.storeCategory.map((category, index) => (
              <div className='flex items-center gap-[4px]' key={category._id}>
                <span className='text-[#636464] line-clamp-1'>{category.name}</span>
                {index !== store.storeCategory.length - 1 && (
                  <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                )}
              </div>
            ))}
          </div>

          <div className='flex items-center gap-[6px]'>
            {store?.avgRating != 0 && (
              <>
                <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
                  <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#fc6011] md:text-[14px]'>{store?.avgRating?.toFixed(2)}</span>
              </>
            )}
            {store?.amountRating != 0 && (
              <span className='text-[#636464] md:text-[14px] line-clamp-1'>{`(${store?.amountRating} đánh giá)`}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantSmallCard;
