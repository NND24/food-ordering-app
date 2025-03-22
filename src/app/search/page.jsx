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

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openFilter, setOpenFilter] = useState(null);

  // Get query from URL
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  const { data: searchedStore, refetch: refetchSearchedStore } = useGetAllStoreQuery({
    name,
    category,
    sort,
    limit,
    page,
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

  console.log(searchedStore);

  useEffect(() => {
    refetchSearchedStore();
    refetchRatingStore();
    refetchStandoutStore;
  }, []);

  return (
    <>
      <Heading title='Tìm kiếm' description='' keywords='' />
      {openFilter ? (
        <div className='pb-[160px] pt-[85px]'>
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[20px] bg-[#fff] h-[85px] px-[20px]'>
            <Image src='/assets/close.png' alt='' width={25} height={25} onClick={() => setOpenFilter(null)} />
          </div>

          {openFilter === "All Filter" ? (
            <>
              <SortBy />
              <CategoryFilter />
            </>
          ) : openFilter === "Sort By" ? (
            <SortBy />
          ) : (
            <FilterPrice />
          )}

          <div className='fixed bottom-0 left-0 right-0 bg-[#fff]'>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fc6011] px-[20px] py-[15px] m-[20px] w-[90%]'>
              <span className='text-[#fff] text-[20px] font-semibold'>Áp dụng</span>
            </div>
            <div className='flex items-center justify-center rounded-[8px] bg-[#fff] px-[20px] py-[15px] m-[20px] w-[90%] border border-[#a3a3a3a3] border-solid'>
              <span className='text-[#fc6011] text-[20px] font-semibold'>Làm mới</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='pt-[180px] px-[20px] md:pt-[75px] md:w-[90%] md:mx-auto md:px-0'>
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
                      <div className='bg-[#fc6011] w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                        <span className='text-[#fff] text-[18px] md:text-[16px]'>1</span>
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
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[240px] overflow-auto small-scrollbar'>
                    {standoutStore &&
                      standoutStore.data.map((store) => <RestaurantSmallCard key={store._id} store={store} />)}
                  </ul>
                </div>

                <div className='rounded-md mb-6 bg-[#fff] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <h3 className='text-[#4A4B4D] text-[20px] bg-[#e8e9e9] text-center px-4 py-3 font-semibold'>
                    Quán ăn được đánh giá tốt
                  </h3>
                  <ul className='flex flex-col gap-[8px] p-[8px] max-h-[240px] overflow-auto small-scrollbar'>
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
    </>
  );
};

export default page;
