"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const name = searchParams.get("name");
  const category = searchParams.get("category") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  const handleSort = () => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    if (limit) params.set("limit", limit);
    if (page) params.set("page", page);

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    handleSort();
  }, [sort]);

  return (
    <div>
      <div className='bg-[#e8e9e9] px-[20px] py-[15px] md:text-[20px] md:text-center md:px-4 md:py-2 md:font-semibold'>
        <span className='text-[#4A4B4D] mb-[10px]'>Sắp xếp theo</span>
      </div>

      <div
        className='flex gap-[15px] p-[20px] md:p-[10px] cursor-pointer'
        style={{ borderBottom: "1px solid #a3a3a3a3" }}
        onClick={() => setSort("name")}
      >
        <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
          <Image src='/assets/store.png' alt='' layout='fill' objectFit='contain' />
        </div>
        <div className='flex flex-1 items-center justify-between'>
          <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>Tên</h3>
          <div className='relative w-[30px] pt-[30px] md:w-[15px] md:pt-[15px] cursor-pointer'>
            <Image
              src={`/assets/${sort === "name" ? "button_active" : "button"}.png`}
              alt=''
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
      </div>

      <div
        className='flex gap-[15px] p-[20px] md:p-[10px] cursor-pointer'
        style={{ borderBottom: "1px solid #a3a3a3a3" }}
        onClick={() => setSort("standout")}
      >
        <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
          <Image src='/assets/ic_fire.png' alt='' layout='fill' objectFit='contain' />
        </div>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>Nổi bật</h3>
          </div>
          <div className='relative w-[30px] pt-[30px] md:w-[15px] md:pt-[15px] cursor-pointer'>
            <Image
              src={`/assets/${sort === "standout" ? "button_active" : "button"}.png`}
              alt=''
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
      </div>

      <div
        className='flex gap-[15px] p-[20px] md:p-[10px] cursor-pointer'
        style={{ borderBottom: "1px solid #a3a3a3a3" }}
        onClick={() => setSort("rating")}
      >
        <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
          <Image src='/assets/ic_star_outline.png' alt='' layout='fill' objectFit='contain' />
        </div>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <h3 className='text-[#4A4B4D] text-[20px] font-medium md:text-[16px]'>Đánh giá</h3>
          </div>
          <div className='relative w-[30px] pt-[30px] md:w-[15px] md:pt-[15px] cursor-pointer'>
            <Image
              src={`/assets/${sort === "rating" ? "button_active" : "button"}.png`}
              alt=''
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
