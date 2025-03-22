"use client";
import { useSelector } from "react-redux";
import CartItem from "../../components/cart/CartItem";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import React, { useEffect, useState } from "react";
import { useClearCartMutation, useGetUserCartQuery } from "../../redux/features/cart/cartApi";
import Image from "next/image";
import ConfirmToast from "../../components/ConfirmToast";

const page = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;
  const cartState = useSelector((state) => state.cart);
  const { userCart } = cartState;

  const { isLoading: getUserCartLoading, refetch: refetchUserCart } = useGetUserCartQuery(null, {
    skip: !currentUser,
  });
  const [clearCart] = useClearCartMutation();

  useEffect(() => {
    console.log(userCart);
  }, [userCart]);

  useEffect(() => {
    if (currentUser) {
      refetchUserCart();
    }
  }, [currentUser, refetchUserCart]);

  const handleClearCart = async () => {
    await clearCart();
  };

  return (
    <>
      <div className='pt-[30px] pb-[100px] md:pt-[75px] md:px-0'>
        <Heading title='Đơn hàng' description='' keywords='' />
        <div className='hidden md:block'>
          <Header page='carts' />
        </div>

        <MobileHeader text='Giỏ hàng' page='carts' />

        <div className='md:w-[90%] md:mx-auto px-[20px]'>
          {!getUserCartLoading ? (
            <>
              {userCart ? (
                <div className='my-[20px]'>
                  <div className='flex items-center justify-between mb-[20px]'>
                    <h3 className='text-[#4A4B4D] text-[24px] font-bold hidden md:block'>Các cửa hàng đang đặt món</h3>
                    <div
                      className='flex items-center justify-center gap-[10px] p-[8px] rounded-[6px] bg-[#fc6011] cursor-pointer ml-auto md:ml-0'
                      onClick={() => setShowConfirm(true)}
                    >
                      <div className='relative w-[30px] pt-[30px] md:w-[24px] md:pt-[24px]'>
                        <Image src='/assets/trash_white.png' alt='' layout='fill' objectFit='contain' />
                      </div>
                      <span className='text-white font-semibold text-[18px]'>Xóa hết giỏ hàng</span>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
                    {userCart?.map((cartItem) => (
                      <CartItem key={cartItem._id} cartItem={cartItem} refetchUserCart={refetchUserCart} />
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className='text-[#4A4B4D] text-[24px] font-bold my-[10px]'>Giỏ hàng trống</h3>
              )}
            </>
          ) : (
            <h3 className='text-[#4A4B4D] text-[24px] font-bold my-[10px]'>Đang tải...</h3>
          )}
        </div>

        <div className='block md:hidden'>
          <NavBar page='carts' />
        </div>
      </div>
      {showConfirm && (
        <ConfirmToast
          message='Bạn có chắc chắn muốn xóa hết giỏ hàng?'
          onConfirm={() => {
            handleClearCart();
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default page;
