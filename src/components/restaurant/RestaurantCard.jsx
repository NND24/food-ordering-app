import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantCard = ({ store }) => {
  return (
    <Link
      href={`/restaurant/${store._id}`}
      className='flex gap-[10px] items-start h-fit md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:p-[10px]'
    >
      <div className='relative flex flex-col gap-[4px] w-[90px] h-[90px] pt-[90px]'>
        <Image src={store.avatar.url || ""} alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
      </div>

      <div className='flex flex-1 items-start justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <h4 className='text-[#4A4B4D] text-[20px] font-semibold line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap'>
            {store.name}
          </h4>

          <div className='flex items-center gap-[6px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
            {store.storeCategory.map((category, index) => (
              <Link
                href={`/search?category=${category._id}`}
                className='flex items-center gap-[6px]'
                key={category._id}
              >
                <span className='text-[#636464]'>{category.name}</span>
                {index !== store.storeCategory.length - 1 && (
                  <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                )}
              </Link>
            ))}
          </div>

          <div className='flex items-center gap-[6px]'>
            {store.avgRating != 0 && (
              <>
                <div className='relative w-[20px] pt-[20px]'>
                  <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#fc6011]'>{store.avgRating.toFixed(2)}</span>
              </>
            )}
            {store.amountRating != 0 && <span className='text-[#636464]'>{`(${store.amountRating} đánh giá)`}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
