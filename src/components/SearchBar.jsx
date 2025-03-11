"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("name") || "");
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("name", search);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    if (limit) params.set("limit", limit);
    if (page) params.set("page", page);

    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='relative bg-[#e8e9e9] text-[#636464] w-full pl-[40px] pr-[20px] py-[10px] my-[30px] rounded-[8px] md:py-[5px] md:m-0 md:w-[90%] lg:w-[60%]'>
      <Image
        src='/assets/search.png'
        alt=''
        width={20}
        height={20}
        className='absolute top-[50%] translate-y-[-50%] left-[10px]'
        onClick={handleSearch}
      />
      <input
        type='search'
        value={search}
        name=''
        id=''
        placeholder='Tìm kiếm đồ ăn'
        className='bg-[#e8e9e9] text-[18px] w-full'
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
