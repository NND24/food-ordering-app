'use client';

import NavBar from "../../../components/management/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../../../components/management/Header"
import Tabs from "../../../components/management/Tabs"
import DishTab from "../../../components/management/tabs/DishMenuTab"
import ToppingTab from "../../../components/management/tabs/ToppingMenuTab"

const page = () => {
  const tabData = [
    { label: "Món ăn", component: <DishTab /> },
    { label: "Topping", component: <ToppingTab /> },
  ];
  return (
    <>

      <Header title="Thực đơn" />
      <div className='pt-[70px] pb-[10px] bg-gray-100'>

        {/* SEARCH BAR */}

        <div className="w-full flex items-center justify-center py-1 px-1 bg-tranparent">
          {/* Search Bar Container */}
          <div className="w-full flex items-center gap-2 bg-white border border-gray-300 rounded-lg shadow-md px-3 py-2">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Nhập tên món hoặc tên nhóm topping"
              className="flex-1 border-none outline-none text-sm text-gray-700"
            />
            {/* Search Button */}
            <button
              type="button"
              className="p-2 bg-[#fc6011] text-white rounded-md hover:bg-[#e4550b] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <Tabs
          tabs={tabData}
          defaultActiveTab={0} 
          onTabChange={(index) => console.log("Active tab changed to:", index)}
        />
      </div>

      <NavBar page='orders' />
    </>
  );
};

export default page;