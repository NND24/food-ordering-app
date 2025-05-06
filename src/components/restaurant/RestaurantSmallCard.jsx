import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantSmallCard = ({ store }) => {
  return (
    <Link href={`/restaurant/${store._id}`} className='flex gap-[10px] items-start w-full'>
      <div className='relative w-[75px] pt-[75px] shrink-0'>
        <Image
          src={store.avatar.url || ""}
          alt={store.name}
          layout='fill'
          objectFit='cover'
          className='rounded-[8px]'
        />
      </div>

      <div className='flex flex-1 flex-col overflow-hidden'>
        <span className='text-[#4A4B4D] text-[16px] font-semibold line-clamp-2'>{store.name}</span>

        <div className='flex items-center gap-[6px] mt-[4px]'>
          {store?.avgRating !== 0 && (
            <>
              <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
                <Image src='/assets/star_active.png' alt='rating' layout='fill' objectFit='fill' />
              </div>
              <span className='text-[#fc6011] md:text-[14px]'>{store?.avgRating?.toFixed(2)}</span>
            </>
          )}
          {store?.amountRating !== 0 && (
            <span className='text-[#636464] md:text-[14px] line-clamp-1'>({store?.amountRating} đánh giá)</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantSmallCard;
