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
import { useRouter } from "next/navigation";
import { useGetAllChatsQuery } from "../../redux/features/chat/chatApi";
import { useGetAllStoreQuery } from "../../redux/features/store/storeApi";
import { useGetUserCartQuery } from "../../redux/features/cart/cartApi";
import { useGetUserOrderQuery } from "../../redux/features/order/orderApi";
import { useGetUserFavoriteQuery } from "../../redux/features/favorite/favoriteApi";
import { useProvince } from "../../context/ProvinceContext";

const page = () => {
  const router = useRouter();
  const { currentLocation } = useProvince();

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { refetch: refetchUserOrder } = useGetUserOrderQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { refetch: refetchUserFavorite } = useGetUserFavoriteQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { refetch: refetchAllChats } = useGetAllChatsQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: allStore, refetch: refetchAllStore } = useGetAllStoreQuery(
    {
      name: "",
      category: "",
      sort: "",
      limit: "",
      page: "",
      lat: currentLocation.lat === 200 ? 10.762622 : currentLocation.lat,
      lon: currentLocation.lon === 200 ? 106.660172 : currentLocation.lon,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const { data: ratingStore, refetch: refetchRatingStore } = useGetAllStoreQuery(
    {
      name: "",
      category: "",
      sort: "rating",
      limit: "",
      page: "",
      lat: currentLocation.lat === 200 ? 10.762622 : currentLocation.lat,
      lon: currentLocation.lon === 200 ? 106.660172 : currentLocation.lon,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const { data: standoutStore, refetch: refetchStandoutStore } = useGetAllStoreQuery(
    {
      name: "",
      category: "",
      sort: "standout",
      limit: "",
      page: "",
      lat: currentLocation.lat === 200 ? 10.762622 : currentLocation.lat,
      lon: currentLocation.lon === 200 ? 106.660172 : currentLocation.lon,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    refetchAllStore();
    refetchRatingStore();
    refetchStandoutStore();
  }, [currentLocation, refetchAllStore, refetchRatingStore, refetchStandoutStore]);

  useEffect(() => {
    if (currentUser) {
      refetchAllChats();
      refetchUserCart();
      refetchUserOrder();
      refetchUserFavorite();
    }
  }, [currentUser, refetchAllChats, refetchUserCart, refetchUserOrder, refetchUserFavorite]);

  return (
    <div className='pt-[140px] pb-[100px] md:pt-[75px]' name='home_page'>
      <Heading title='Trang chủ' description='' keywords='' />
      <Header />
      {ratingStore && <Hero allStore={ratingStore.data} />}

      <div className='md:w-[90%] md:mx-auto'>
        <div className='px-[20px] pt-[20px] md:px-0'>
          <CategorySlider />
        </div>

        <div className='my-[20px] md:hidden'>
          <div className='flex items-center justify-between px-[20px] md:px-0 md:mb-[10px]'>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold line-clamp-1'>Nhà hàng nổi tiếng</h3>
            <Link href='/search?sort=standout' className='text-[#fc6011] text-[16px] whitespace-nowrap'>
              Xem tất cả
            </Link>
          </div>

          {standoutStore?.data?.[0] && (() => {
            const featured = standoutStore.data[0];
            return (
              <div>
                <Link href={`/store/${featured._id}`} className='my-[20px]'>
                  <div className='relative w-full pt-[45%]'>
                    <Image src={featured.avatar.url} alt='' layout='fill' objectFit='fill' />
                  </div>

                  <h4 className='text-[#4A4B4D] text-[20px] font-semibold px-[20px] py-[4px] line-clamp-1'>
                    {featured.name}
                  </h4>

                  <div className={`flex items-center px-[20px] ${featured.amountRating != 0 && "gap-[10px]"}`}>
                    <div className='flex items-center gap-[6px] flex-shrink-0'>
                      {featured.avgRating != 0 && (
                        <>
                          <div className='relative w-[20px] h-[20px] md:w-[15px] md:h-[15px] flex-shrink-0'>
                            <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='cover' />
                          </div>
                          <span className='text-[#fc6011]'>{featured.avgRating.toFixed(2)}</span>
                        </>
                      )}
                      {featured.amountRating != 0 && (
                        <span className='text-[#636464]'>{`(${featured.amountRating} đánh giá)`}</span>
                      )}
                    </div>

                    {featured.amountRating != 0 && (
                      <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011] flex-shrink-0'></div>
                    )}

                    <div className='flex items-center gap-[4px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
                      {featured.storeCategory.map((category, index) => (
                        <span
                          key={category._id}
                          className='text-[#636464] cursor-pointer hover:underline'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/search?category=${category._id}`);
                          }}
                        >
                          {category.name}
                          {index !== featured.storeCategory.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })()}
        </div>

        <div className='my-[20px] px-[20px] md:px-0'>
          <div className='flex items-center justify-between mb-[10px]'>
            <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Phổ biến nhất</h3>
            <Link href='/search?sort=rating' className='text-[#fc6011] text-[16px]'>
              Xem tất cả
            </Link>
          </div>

          {ratingStore && <RestaurantBigSlider allStore={ratingStore.data} />}
        </div>

        <div className='my-[20px] px-[20px] md:px-0'>{allStore && <ListRestaurant allStore={allStore.data} />}</div>
      </div>

      <div className='md:hidden'>
        <NavBar page='home' />
      </div>
    </div>
  );
};

export default page;
