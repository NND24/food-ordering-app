"use client";
import React from "react";
import DishCard from "./DishCard";
import { groupDishesByCategory } from "../../utils/functions";

const ListDish = ({ allDish }) => {
  const groupedDishes = groupDishesByCategory(allDish);

  return (
    <>
      {groupedDishes.map(({ category, dishes }) => (
        <div key={category._id} className='mb-[20px]'>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>{category.name}</h3>
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2'>
            {dishes.map((dish) => (
              <DishCard key={dish._id} dish={dish} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ListDish;
