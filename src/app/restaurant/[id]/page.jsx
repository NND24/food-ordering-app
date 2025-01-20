"use client";
import ListDishBig from "@/components/dish/ListDishBig";
import ListDish from "@/components/dish/ListDish";
import Header from "@/components/header/Header";
import MostRatingReviewSlider from "@/components/review/MostRatingReviewSlider";
import RatingBar from "@/components/review/RatingBar";
import ReviewItem from "@/components/review/ReviewItem";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";

const page = () => {
  const ratings = {
    5: 50,
    4: 30,
    3: 15,
    2: 5,
    1: 10,
  };

  return (
    <div className={`md:w-[90%] md:mx-auto pb-[20px]`}>
      <Heading title='Cửa hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-[20px] pt-[20px] md:hidden'>
        <Image src='/assets/arrow_left_white.png' alt='' width={30} height={30} />
        <div className='flex items-center gap-[20px]'>
          <Image src='/assets/favorite_white.png' alt='' width={30} height={30} />
          <Image src='/assets/notification_white.png' alt='' width={30} height={30} />
        </div>
      </div>

      <div className='relative pt-[50%] z-0 lg:pt-[35%]'>
        <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='cover' />
      </div>

      <div className='flex gap-[25px] my-[20px] mx-[20px] items-start bg-[#fff] translate-y-[-60%] mb-[-10%] p-[10px] rounded-[6px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <div className='relative flex flex-col gap-[4px] w-[90px] pt-[90px] md:w-[120px] md:pt-[120px]'>
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
              <Image src='/assets/star_active.png' alt='' width={20} height={20} />
              <span className='text-[#fc6011]'>4.9</span>
              <span className='text-[#636464]'>{"(124 ratings)"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='my-[20px] px-[20px] md:px-0 lg:mt-[60px]'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Dành cho bạn</h3>
        <ListDishBig />
      </div>

      <div className='my-[20px] px-[20px] md:px-0'>
        <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Mì xào</h3>

        <ListDish />
      </div>

      <div className='p-[20px] bg-[#e6e6e6] md:rounded-[10px]'>
        <div className='flex items-center justify-between pb-[10px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[10px]'>Mọi người nhận xét</h3>
          <Link href='/restaurant/123/reviews' className='block md:hidden'>
            <Image
              src='/assets/arrow_right_long.png'
              alt=''
              width={40}
              height={40}
              className='bg-[#fff] p-[8px] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
            />
          </Link>
        </div>

        <MostRatingReviewSlider />
      </div>

      <div className='hidden md:block'>
        <RatingBar ratings={ratings} />
        <ReviewItem />
      </div>

      <Link
        href='/restaurant/123/cart/321'
        className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100]'
      >
        <div className='flex items-center justify-between rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] w-full'>
          <div className='flex items-center gap-[8px]'>
            <span className='text-[#fff] text-[20px] font-semibold'>Giỏ hàng</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#fff]'></div>
            <span className='text-[#fff] text-[20px] font-semibold'>1 món</span>
          </div>
          <span className='text-[#fff] text-[20px] font-semibold'>150.000đ</span>
        </div>
      </Link>
    </div>
  );
};

export default page;
