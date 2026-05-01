"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

const RestaurantCard = ({ store }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Link
      href={`/store/${store._id}`}
      className='flex gap-[10px] items-start h-fit md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:p-[10px]'
    >
      <div className='relative flex flex-col gap-[4px] w-[90px] h-[90px] pt-[90px]'>
        <Image src={store.avatar?.url || ""} alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
      </div>

      <div className='flex flex-col flex-1 items-start justify-between overflow-hidden'>
        <h4 className='truncate text-[#4A4B4D] dark:text-gray-100 text-[20px] font-semibold w-full'>{store.name}</h4>

        <div className='flex items-center gap-[6px] min-w-0 text-ellipsis whitespace-nowrap'>
          {store.storeCategory.map((category, index) => (
            <span
              key={category._id}
              className='flex items-center gap-[6px] cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/search?category=${category._id}`);
              }}
            >
              <span className='text-[#636464] dark:text-gray-400 hover:underline'>{category.name}</span>
              {index !== store.storeCategory.length - 1 && (
                <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
              )}
            </span>
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
          {store.amountRating != 0 && <span className='text-[#636464] dark:text-gray-400'>{`(${store.amountRating} ${t("restaurant.reviews")})`}</span>}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
