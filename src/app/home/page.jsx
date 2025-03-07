"use client";
import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import CategorySlider from "../../components/category/CategorySlider";
import Link from "next/link";
import Header from "../../components/header/Header";
import RestaurantBigSlider from "../../components/restaurant/RestaurantBigSlider";
import Hero from "../../components/hero/Hero";
import ListRestaurant from "../../components/restaurant/ListRestaurant";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import { useGetAllChatsQuery } from "../../redux/features/chat/chatApi";
import { useGetAllStoreQuery } from "../../redux/features/store/storeApi";

const page = () => {
  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchAllChats } = useGetAllChatsQuery();
  const { data: allStore, refetch: refetchAllStore } = useGetAllStoreQuery({
    name: "",
    category: "",
    sort: "",
    limit: "",
    page: "",
  });
  const { data: ratingStore, refetch: refetchRatingStore } = useGetAllStoreQuery({
    name: "",
    category: "",
    sort: "rating",
    limit: "",
    page: "",
  });
  const { data: standoutStore, refetch: refetchStandoutStore } = useGetAllStoreQuery({
    name: "",
    category: "",
    sort: "standout",
    limit: "",
    page: "",
  });

  useEffect(() => {
    refetchAllStore();
    refetchRatingStore();
    refetchStandoutStore;
  }, []);

  useEffect(() => {
    if (currentUser) {
      refetchAllChats();
    }
  }, [currentUser, refetchAllChats]);

  return (
    <>
      {allStore && (
        <div className='pt-[180px] pb-[100px] md:pt-[75px]'>
          <Heading title='Trang chủ' description='' keywords='' />
          <Header />
          <Hero allStore={ratingStore.data} />

          <div className='md:w-[90%] md:mx-auto'>
            <div className='px-[20px] pt-[20px] md:px-0'>
              <CategorySlider />
            </div>

            <div className='my-[20px] md:hidden'>
              <div className='flex items-center justify-between px-[20px] md:px-0 md:mb-[10px]'>
                <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Các nhà hàng nổi tiếng</h3>
                <Link href='/search?sort=standout' className='text-[#fc6011] text-[16px]'>
                  Xem tất cả
                </Link>
              </div>

              <div className=''>
                <Link href={`/restaurant/${standoutStore.data[0]._id}`} className='my-[20px]'>
                  <div className='relative w-full pt-[45%]'>
                    <Image src={standoutStore.data[0].avatar.url} alt='' layout='fill' objectFit='fill' />
                  </div>

                  <h4 className='text-[#4A4B4D] text-[20px] font-semibold px-[20px] py-[4px]'>
                    {standoutStore.data[0].name}
                  </h4>

                  <div
                    className={`flex items-center px-[20px] ${standoutStore.data[0].amountRating != 0 && "gap-[10px]"}`}
                  >
                    <div className='flex items-center gap-[6px]'>
                      {standoutStore.data[0].avgRating != 0 && (
                        <>
                          <Image src='/assets/star_active.png' alt='' width={20} height={20} />
                          <span className='text-[#fc6011]'>{standoutStore.data[0].avgRating.toFixed(2)}</span>
                        </>
                      )}
                      {standoutStore.data[0].amountRating != 0 && (
                        <span className='text-[#636464]'>{`(${standoutStore.data[0].amountRating} đánh giá)`}</span>
                      )}
                    </div>

                    {standoutStore.data[0].amountRating != 0 && (
                      <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                    )}

                    <div className='flex items-center gap-[4px]'>
                      {standoutStore.data[0].storeCategory.map((category, index) => (
                        <div className='flex items-center gap-[4px]' key={category._id}>
                          <span className='text-[#636464]'>{category.name}</span>
                          {index !== standoutStore.data[0].storeCategory.length - 1 && (
                            <span className='text-[#636464]'>-</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className='my-[20px] px-[20px] md:px-0'>
              <div className='flex items-center justify-between mb-[10px]'>
                <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Phổ biến nhất</h3>
                <Link href='/search?sort=rating' className='text-[#fc6011] text-[16px]'>
                  Xem tất cả
                </Link>
              </div>

              <RestaurantBigSlider allStore={ratingStore.data} />
            </div>

            <div className='my-[20px] px-[20px] md:px-0'>
              <ListRestaurant allStore={allStore.data} />
            </div>
          </div>

          <div className='md:hidden'>
            <NavBar page='home' />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
