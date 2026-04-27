"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetAllSystemCategoriesQuery } from "../../redux/features/systemCategory/systemCategoryApi";

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  const { data: allCategories } = useGetAllSystemCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setSelectedCategories(category !== "" ? category.split(",") : []);
  }, [category]);

  const handleCategoryClick = (typeId) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(typeId)) {
      updatedCategories = updatedCategories.filter((id) => id !== typeId);
    } else {
      updatedCategories.push(typeId);
    }
    setSelectedCategories(updatedCategories);

    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (updatedCategories.length > 0) params.set("category", updatedCategories.join(","));
    if (sort) params.set("sort", sort);
    if (limit) params.set("limit", limit);
    if (page) params.set("page", page);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className='rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-md transition-colors duration-300'>
      <div className='bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white px-5 py-3 text-lg font-semibold text-center'>
        Danh mục
      </div>

      <div className='max-h-[400px] overflow-auto small-scrollbar'>
        {allCategories?.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className={`flex items-center justify-between p-4 cursor-pointer transition-all border-b border-gray-200 dark:border-gray-700
              hover:bg-[#fff7f2] dark:hover:bg-gray-800
              ${selectedCategories.includes(category._id) ? "bg-[#fff1e7] dark:bg-gray-800" : "dark:bg-gray-900"}`}
          >
            <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-medium line-clamp-1 w-[98%]'>
              {category.name}
            </h3>
            <Image
              src={`/assets/${selectedCategories.includes(category._id) ? "check_box_checked" : "check_box_empty"}.png`}
              alt=''
              width={24}
              height={24}
              className='object-contain flex-shrink-0'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
