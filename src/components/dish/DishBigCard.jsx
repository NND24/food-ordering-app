"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUpdateCartMutation } from "../../redux/features/cart/cartApi";
import { useRouter } from "next/navigation";

const DishBigCard = ({ dish, storeId, cartItems, refetchCartStore }) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState(0);
  const [showChangeAmount, setShowChangeAmount] = useState(false);
  const [pendingQuantity, setPendingQuantity] = useState(null);

  const [updateCart, { isSuccess: updateCartSuccess }] = useUpdateCartMutation();

  useEffect(() => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.dish._id === dish._id);
      setQuantity(cartItem?.quantity || 0);
    }
  }, [cartItems]);

  useEffect(() => {
    if (updateCartSuccess) {
      refetchCartStore();
    }
  }, [updateCartSuccess]);

  useEffect(() => {
    if (pendingQuantity) {
      updateCart({ storeId, dishId: dish._id, quantity: pendingQuantity });
      setPendingQuantity(null);
    }
  }, [pendingQuantity]);

  const handleChangeQuantity = (amount) => {
    if (dish.toppingGroups.length > 0) {
      router.push(`/restaurant/${storeId}/dish/${dish._id}`);
    } else {
      setQuantity((prev) => {
        const newQuantity = Math.max(prev + amount, 0);
        setPendingQuantity(newQuantity);
        return newQuantity;
      });
    }
  };

  useEffect(() => {
    if (quantity === 0) {
      setShowChangeAmount(false);
    } else {
      setShowChangeAmount(true);
    }
  }, [quantity]);

  return (
    <Link href={`/restaurant/${dish.store}/dish/${dish._id}`} className=''>
      <div className='relative flex flex-col gap-[4px] pt-[75%] w-full'>
        <Image
          src={dish?.image?.url}
          alt=''
          layout='fill'
          objectFit='cover'
          className='rounded-[15px] justify-center'
        />

        {showChangeAmount ? (
          <div className='absolute bottom-[10%] right-[5%] flex items-center justify-center bg-[#fff] gap-[4px] border border-[#fc6011] border-solid rounded-full px-[8px] py-[4px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] z-10'>
            <Image
              src='/assets/minus.png'
              alt=''
              width={20}
              height={20}
              onClick={(e) => {
                e.preventDefault();
                handleChangeQuantity(-1);
              }}
              className=''
            />
            <input
              type='number'
              value={quantity}
              onClick={(e) => {
                e.preventDefault();
              }}
              readOnly
              name=''
              id=''
              className='text-[#4A4B4D] text-[20px] font-bold w-[40px] text-center'
            />
            <Image
              src='/assets/plus_active.png'
              alt=''
              width={20}
              height={20}
              onClick={(e) => {
                e.preventDefault();
                handleChangeQuantity(1);
              }}
              className=''
            />
          </div>
        ) : (
          <Image
            src='/assets/add_active.png'
            alt=''
            width={40}
            height={40}
            className='absolute bottom-[10%] right-[5%] bg-[#fff] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
            onClick={(e) => {
              e.preventDefault();
              handleChangeQuantity(1);
            }}
          />
        )}
      </div>

      <div>
        <h4 className='text-[#4A4B4D] text-[20px] font-medium pt-[2px] line-clamp-1'>{dish?.name}</h4>
        {dish?.description && <p className='text-[#a4a5a8] text-[14px]'>{dish?.description}</p>}
        <p className='text-[#000] font-bold'>{dish?.price}đ</p>
      </div>
    </Link>
  );
};

export default DishBigCard;
