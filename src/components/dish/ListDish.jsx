"use client";
import React from "react";
import DishCard from "./DishCard";

const ListDish = () => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3'>
      {categories.map((category, index) => (
        <DishCard key={index} />
      ))}
    </div>
  );
};

export default ListDish;
