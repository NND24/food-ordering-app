"use client";
import React from "react";
import DishBigCard from "./DishBigCard";

const ListDishBig = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='grid gap-[20px] grid-cols-2 lg:grid-cols-3'>
      {categories.slice(0, 3).map((category, index) => (
        <DishBigCard key={index} />
      ))}
    </div>
  );
};

export default ListDishBig;
