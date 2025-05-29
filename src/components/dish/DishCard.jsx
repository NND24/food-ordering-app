"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useGetUserCartQuery, useUpdateCartMutation } from "../../redux/features/cart/cartApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DishCard = ({ dish, storeInfo, cartItems }) => {
  const router = useRouter();
  const [cartItem, setCartItem] = useState(null);
  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const [updateCart, { isSuccess: updateCartSuccess }] = useUpdateCartMutation();

  useEffect(() => {
    if (cartItems) {
      setCartItem(cartItems.find((item) => item?.dish?._id === dish?._id));
    }
  }, [cartItems]);

  const handleChangeQuantity = async (amount) => {
    if (storeInfo?.data?.openStatus === "CLOSED") {
      toast.warn("Món ăn đã hết hàng. Vui lòng chọn món khác.");
      return;
    }

    if (currentUser) {
      if (dish.toppingGroups.length > 0) {
        router.push(`/restaurant/${storeInfo?.data?._id}/dish/${dish._id}`);
      } else {
        const currentQuantity = cartItem?.quantity || 0;
        const newQuantity = Math.max(currentQuantity + amount, 0);
        await updateCart({ storeId: storeInfo?.data?._id, dishId: dish._id, quantity: newQuantity });
      }
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục đặt hàng!");
    }
  };

  useEffect(() => {
    if (updateCartSuccess) {
      refetchUserCart();
      toast.success("Cập nhật giỏ hàng thành công");
    }
  }, [updateCartSuccess]);

  return (
    <div className='relative'>
      {storeInfo?.data?.openStatus === "CLOSED" ? (
        <div className='absolute inset-0 bg-[#00000080] z-20 flex items-center justify-center rounded-[8px] cursor-not-allowed'>
          <span className='text-white text-[16px] font-semibold'>Cửa hàng hiện đang đóng</span>
        </div>
      ) : dish?.stockStatus === "OUT_OF_STOCK" ? (
        <div className='absolute inset-0 bg-[#00000080] z-20 flex items-center justify-center rounded-[8px] cursor-not-allowed'>
          <span className='text-white text-[16px] text-center font-semibold'>
            Món ăn hiện không còn được phục vụ. Vui lòng chọn món khác.
          </span>
        </div>
      ) : null}

      <Link
        name='storeCard'
        href={`/restaurant/${dish.store}/dish/${dish._id}`}
        className={`relative flex gap-[15px] items-start pb-[15px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[8px] md:p-[10px] ${
          storeInfo?.data?.openStatus === "CLOSED" ? "pointer-events-none" : ""
        }`}
        style={{ borderBottom: "1px solid #a3a3a3a3" }}
      >
        {dish?.image?.url ? (
          <div className='relative flex flex-col gap-[4px] min-w-[90px] h-[90px] pt-[90px]'>
            <Image src={dish.image.url} alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
          </div>
        ) : null}

        <div className='flex flex-col flex-1'>
          <h4 className='text-[#4A4B4D] text-[20px] font-medium pt-[2px] line-clamp-1' name='storeName'>
            {dish?.name}
          </h4>
          {dish?.description && <p className='text-[#a4a5a8] text-[14px] line-clamp-1'>{dish?.description}</p>}
          <div className='flex items-center justify-between'>
            <span className='text-[#000] font-bold'>{Number(dish?.price).toLocaleString("vi-VN")}đ</span>
            <div className='absolute bottom-[8%] right-[2%]'>
              {cartItem?.quantity > 0 ? (
                <div className='flex items-center justify-center bg-[#fff] gap-[4px] border border-[#fc6011] border-solid rounded-full px-[8px] py-[4px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
                  <Image
                    src='/assets/minus.png'
                    alt=''
                    width={20}
                    height={20}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeQuantity(-1);
                    }}
                  />
                  <input
                    type='number'
                    value={cartItem?.quantity}
                    onClick={(e) => e.preventDefault()}
                    readOnly
                    className='text-[#4A4B4D] text-[20px] font-bold w-[40px] text-center bg-transparent'
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
                  />
                </div>
              ) : (
                <Image
                  src='/assets/add_active.png'
                  alt=''
                  width={40}
                  height={40}
                  className='bg-[#fff] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeQuantity(1);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DishCard;
