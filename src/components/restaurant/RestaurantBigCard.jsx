import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantBigCard = ({ store }) => {
  return (
    <Link href={`/restaurant/${store._id}`}>
      <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
        <Image src={store.avatar.url} alt='' layout='fill' objectFit='cover' className='rounded-[6px] justify-center' />
      </div>

      <div>
        <h4 className='text-[#4A4B4D] text-[20px] font-semibold py-[4px]'>{store.name}</h4>

        <div className={`flex items-center ${store.amountRating != 0 && "gap-[6px]"}`}>
          <div className='flex items-center gap-[6px]'>
            {store.avgRating != 0 && (
              <>
                <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
                  <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
                </div>
                <span className='text-[#fc6011] md:text-[14px]'>{store.avgRating.toFixed(2)}</span>
              </>
            )}
            {store.amountRating != 0 && (
              <span className='text-[#636464] md:text-[14px]'>{`(${store.amountRating} đánh giá)`}</span>
            )}
          </div>

          {store.amountRating != 0 && <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>}

          <div className='flex items-center gap-[4px]'>
            {store.storeCategory.map((category, index) => (
              <div className='flex items-center gap-[4px]' key={category._id}>
                <span className='text-[#636464]'>{category.name}</span>
                {index !== store.storeCategory.length - 1 && <span className='text-[#636464]'>-</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantBigCard;
