"use client";
import React from "react";
import DishBigCard from "./DishBigCard";

const ListDishBig = ({ storeId, allDish, cartItems, refetchCartStore }) => {
  return (
    <div className='grid gap-[20px] grid-cols-2 lg:grid-cols-3'>
      {allDish.slice(0, 3).map((dish) => (
        <DishBigCard
          key={dish._id}
          dish={dish}
          storeId={storeId}
          cartItems={cartItems}
          refetchCartStore={refetchCartStore}
        />
      ))}
    </div>
  );
};

export default ListDishBig;
