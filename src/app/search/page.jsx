"use client";
import Category from "../../components/category/CategorySlider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SortBy from "../../components/filter/SortBy";
import CategoryFilter from "../../components/filter/CategoryFilter";
import Header from "../../components/header/Header";
import RestaurantSmallCard from "../../components/restaurant/RestaurantSmallCard";
import RestaurantBigCard from "../../components/restaurant/RestaurantBigCard";
import Pagination from "../../components/Pagination";
import Heading from "../../components/Heading";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllStoreQuery } from "../../redux/features/store/storeApi";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { useProvince } from "../../context/ProvinceContext";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openFilter, setOpenFilter] = useState(null);

  const { currentLocation } = useProvince();

  // Get query from URL
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  const { data: searchedStore, refetch: refetchSearchedStore } = useGetAllStoreQuery(
    {
      name,
      category,
      sort,
      limit,
      page,
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
    refetchSearchedStore();
    refetchRatingStore();
    refetchStandoutStore();
  }, [currentLocation, refetchSearchedStore, refetchRatingStore, refetchStandoutStore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, searchedStore]);

  return (
    <>
      <Heading title='Tìm kiếm' description='' keywords='' />
      {openFilter ? (
        <div className='pb-[160px] pt-[85px]'>
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[20px] bg-[#fff] h-[85px] px-[20px]'>
            <Image
              src='/assets/close.png'
              className='cursor-pointer'
              alt=''
              width={25}
              height={25}
              onClick={() => setOpenFilter(null)}
            />
          </div>

          {openFilter === "All Filter" ? (
            <>
              <SortBy />
              <CategoryFilter />
            </>
          ) : openFilter === "Sort By" ? (
            <SortBy />
          ) : (
            <CategoryFilter />
          )}

          {/* <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] px-[20px] py-[15px] m-[20px] w-[90%]'>
              <span className='text-[#fff] text-[20px] font-semibold'>Áp dụng</span>
            </div>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fff] px-[20px] py-[15px] m-[20px] w-[90%] border border-[#a3a3a3a3] border-solid'>
              <span className='text-[#fc6011] text-[20px] font-semibold'>Làm mới</span>
            </div>
          </div> */}
        </div>
      ) : (
        <div className='pt-[150px] pb-[100px]  px-[20px] md:pt-[90px] md:w-[90%] md:mx-auto md:px-0'>
          <Header />

          <div className='py-[20px]'>
            <Category />

            <div className='grid grid-cols-12 gap-[35px] md:mt-[20px]'>
              <div className='xl:col-span-9 lg:col-span-8 md:col-span-8 col-span-12'>
                <div className='block md:hidden'>
                  <div className='flex items-center gap-[15px] overflow-x-auto whitespace-nowrap my-[15px]'>
                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] z-10 cursor-pointer'
                      onClick={() => setOpenFilter("All Filter")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/filter.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                    </div>

                    <div
                      className='relative flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Sort By")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/arrow_up_down.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Sắp xếp theo</span>
                    </div>

                    <div
                      className='flex items-center gap-[10px] bg-[#e8e9e9] rounded-[15px] px-[15px] py-[10px] md:py-[6px] cursor-pointer'
                      onClick={() => setOpenFilter("Category Filter")}
                    >
                      <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/promotion.png' alt='' layout='fill' objectFit='fill' />
                      </div>
                      <span className='text-[#4A4B4D] text-[18px] md:text-[16px]'>Danh mục</span>
                    </div>
                    <Link
                      href='/search'
                      className='text-[#0054ff] text-[18px] md:text-[16px] font-semibold cursor-pointer'
                    >
                      Làm mới
                    </Link>
                  </div>
                </div>

                <div className='hidden md:block z-0'>
                  <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-[20px]'>
                    {searchedStore ? (
                      searchedStore.data.map((store) => <RestaurantBigCard key={store._id} store={store} />)
                    ) : (
                      <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Không tìm thấy cửa hàng nào</h3>
                    )}
                  </div>
                </div>
              </div>

              <div className='xl:col-span-3 lg:col-span-4 md:col-span-4 hidden md:block'>
                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <SortBy />
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <h3 className='text-[#4A4B4D] text-[20px] bg-[#e8e9e9] text-center px-4 py-3 font-semibold'>
                    Quán ăn nổi bật
                  </h3>
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[255px] w-full overflow-y-auto overflow-x-hidden small-scrollbar box-border'>
                    {standoutStore &&
                      standoutStore.data.map((store) => <RestaurantSmallCard key={store._id} store={store} />)}
                  </ul>
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <h3 className='text-[#4A4B4D] text-[20px] bg-[#e8e9e9] text-center px-4 py-3 font-semibold'>
                    Quán ăn được đánh giá tốt
                  </h3>
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[255px] w-full overflow-y-auto overflow-x-hidden small-scrollbar box-border'>
                    {ratingStore &&
                      ratingStore.data.map((store) => <RestaurantSmallCard key={store._id} store={store} />)}
                  </ul>
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <CategoryFilter />
                </div>
              </div>
            </div>

            <div className='block md:hidden'>
              <div className='flex flex-col gap-[10px]'>
                {searchedStore ? (
                  searchedStore.data.map((store) => <RestaurantBigCard key={store._id} store={store} />)
                ) : (
                  <h3 className='text-[20px] text-[#4a4b4d] font-semibold'>Không tìm thấy cửa hàng nào</h3>
                )}
              </div>
            </div>

            {searchedStore && <Pagination page={page} limit={limit} total={searchedStore.total} />}
          </div>
        </div>
      )}
      {!openFilter && (
        <div className='md:hidden'>
          <NavBar page='' />
        </div>
      )}
    </>
  );
};

export default page;
