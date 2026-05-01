"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClearCartItemMutation, useGetUserCartQuery } from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useTranslation } from "../../hooks/useTranslation";

const CartItem = ({ cartItem }) => {
  const [quantity, setQuantity] = useState(0);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const [clearCartItem, { isSuccess: clearCartItemSuccess }] = useClearCartItemMutation();

  useEffect(() => {
    const totalQuantity = cartItem.items.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(totalQuantity);
  }, [cartItem.items]);

  useEffect(() => {
    if (clearCartItemSuccess) {
      refetchUserCart();
      toast.success(t("cart.deleteSuccess"));
    }
  }, [clearCartItemSuccess]);

  const confirmClearCartItem = async () => {
    const result = await Swal.fire({
      title: t("cart.deleteConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.agree"),
      cancelButtonText: t("common.cancel"),
    });
    if (result.isConfirmed) {
      await clearCartItem(cartItem.store._id);
    }
  };

  const total = cartItem.items.length;

  return (
    <Link
      href={`/store/${cartItem.store._id}/cart`}
      className='relative block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 overflow-hidden'
    >
      {/* Dish images grid */}
      <div className='relative w-full h-56 rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800'>
        {cartItem.items.slice(0, 4).map((item, index) => {
          const imageUrl = item.dish?.image?.url || cartItem.store.avatar?.url || "/assets/logo_app.png";

          let className = "absolute w-full h-full";
          if (total === 2) {
            className = `absolute w-2/3 h-2/3 rounded-xl ${index === 0 ? "top-0 left-0 z-0" : "bottom-0 right-0 z-10"}`;
          } else if (total === 3) {
            if (index === 0) className = "absolute top-0 left-0 w-full h-1/2";
            else className = `absolute bottom-0 w-1/2 h-1/2 ${index === 1 ? "left-0" : "right-0"}`;
          } else if (total >= 4) {
            const positions = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"];
            className = `absolute w-1/2 h-1/2 ${positions[index]}`;
          }

          return (
            <div key={index} className={className}>
              <Image src={imageUrl} alt={item.dish?.name || ""} fill className='object-cover' />
              {total > 4 && index === 3 && (
                <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                  <span className='text-white text-lg font-semibold'>+{total - 4}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className='p-4'>
        <div className='flex items-center justify-between gap-2 mb-1'>
          <h4 className='text-gray-800 dark:text-gray-100 text-lg font-semibold line-clamp-1 flex-1'>
            {cartItem.store.name}
          </h4>
          <p className='text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap'>{quantity} {t("cart.items")}</p>
        </div>

        <div className='text-gray-500 dark:text-gray-400 text-sm line-clamp-1'>
          {cartItem.items.map((item, index) => (
            <span key={index}>
              {item.dish?.name || item.dishName} x{item.quantity}
              {index !== cartItem.items.length - 1 && <span className='text-orange-500'> • </span>}
            </span>
          ))}
        </div>
      </div>

      {/* Delete button */}
      <div
        className='absolute top-3 right-3 z-10 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full cursor-pointer transition'
        onClick={(e) => {
          e.preventDefault();
          confirmClearCartItem();
        }}
      >
        <div className='relative w-6 h-6'>
          <Image
            src={`/assets/trash${theme === "dark" ? "_white" : ""}.png`}
            alt='remove'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
