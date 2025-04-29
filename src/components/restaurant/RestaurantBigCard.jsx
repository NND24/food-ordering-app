import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantBigCard = ({ store }) => {
  return (
    <Link href={`/restaurant/${store._id}`}>
      <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
        <Image
          src={store.avatar.url || ""}
          alt=''
          layout='fill'
          objectFit='cover'
          className='rounded-[6px] justify-center'
        />
      </div>

      <div>
        <h4 className='text-[#4A4B4D] text-[20px] font-semibold py-[4px] line-clamp-1'>{store.name}</h4>

        <div className='flex items-center gap-[6px] overflow-hidden'>
          {/* Rating section */}
          <div className='flex items-center gap-[4px] flex-shrink-0'>
            {store.avgRating != 0 && (
              <>
                <div className='relative w-[20px] h-[20px] md:w-[15px] md:h-[15px] flex-shrink-0'>
                  <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='cover' />
                </div>
                <span className='text-[#fc6011] md:text-[14px]'>{store.avgRating.toFixed(2)}</span>
              </>
            )}
            {store.amountRating != 0 && (
              <span className='text-[#636464] md:text-[14px] whitespace-nowrap'>{`(${store.amountRating} đánh giá)`}</span>
            )}
          </div>

          {/* Dot separator */}
          {store.amountRating != 0 && <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011] flex-shrink-0'></div>}

          {/* Category list */}
          <div className='flex items-center gap-[4px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
            {store.storeCategory.map((category, index) => (
              <Link href={`/search?category=${category._id}`} key={category._id} className='text-[#636464]'>
                {category.name}
                {index !== store.storeCategory.length - 1 && <span>, </span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantBigCard;
