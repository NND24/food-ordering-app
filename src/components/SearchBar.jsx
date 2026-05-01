"use client";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [search, setSearch] = useState(searchParams.get("keyword") || "");
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  // Only sync input from URL when already on the search page.
  // On other pages this effect would fire during navigation and reset
  // the state to "" before handleSearch captures the typed value.
  useEffect(() => {
    if (pathname === "/search") {
      setSearch(searchParams.get("keyword") || "");
    }
  }, [pathname, searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("keyword", search);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='relative w-full my-3 md:my-0 md:w-[90%] lg:w-[60%]'>
      <button
        className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-[#fc6011] transition'
        onClick={handleSearch}
      >
        <Image src='/assets/search.png' alt='search' width={22} height={22} />
      </button>

      <input
        type='text'
        value={search}
        placeholder={t("home.searchPlaceholder")}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full pl-12 pr-10 py-3 rounded-full
          bg-[#f3f3f3] dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none border border-transparent
          focus:border-[#fc6011]
          focus:bg-white dark:focus:bg-gray-900
          focus:shadow-md transition-all'
      />

      {search && (
        <button
          className='absolute top-1/2 right-4 transform -translate-y-1/2
            text-gray-400 dark:text-gray-300
            hover:text-gray-600 dark:hover:text-gray-100 transition'
          onClick={() => setSearch("")}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
