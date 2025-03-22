"use client";
import Image from "next/image";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import RestaurantFavoriteCard from "../../components/restaurant/RestaurantFavoriteCard";
import React, { useEffect, useState } from "react";
import {
  useGetUserFavoriteQuery,
  useRemoveAllFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../redux/features/favorite/favoriteApi";
import { useSelector } from "react-redux";
import ConfirmToast from "../../components/ConfirmToast";
import { toast } from "react-toastify";

const page = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;
  const favoriteState = useSelector((state) => state.favorite);
  const { userFavorite } = favoriteState;

  const { isLoading: getUserFavoriteLoading, refetch: refetchUserFavorite } = useGetUserFavoriteQuery(null, {
    skip: !currentUser,
  });
  const [removeAllFavorite, { isSuccess: removeAllFavoriteSuccess }] = useRemoveAllFavoriteMutation();

  useEffect(() => {
    if (removeAllFavoriteSuccess) {
      toast.success("Xóa hết yêu thích thành công!");
    }
  }, [removeAllFavoriteSuccess]);

  useEffect(() => {
    if (currentUser) {
      refetchUserFavorite();
    }
  }, [currentUser, refetchUserFavorite]);

  const handleRemoveAllFavorite = async () => {
    await removeAllFavorite();
  };

  return (
    <>
      <div className='pt-[30px] pb-[100px] md:pt-[75px] md:px-0'>
        <Heading title='Yêu thích' description='' keywords='' />
        <div className='hidden md:block'>
          <Header page='favorite' />
        </div>

        <MobileHeader text='Quán yêu thích' page='favorite' />

        <div className='md:w-[90%] md:mx-auto px-[20px]'>
          {!getUserFavoriteLoading ? (
            <>
              {userFavorite ? (
                <div className='my-[20px]'>
                  <div className='flex items-center justify-between mb-[20px]'>
                    <h3 className='text-[#4A4B4D] text-[24px] font-bold hidden md:block'>Các cửa hàng yêu thích</h3>
                    <div
                      className='flex items-center justify-center gap-[10px] p-[8px] rounded-[6px] bg-[#fc6011] cursor-pointer ml-auto md:ml-0'
                      onClick={() => setShowConfirm(true)}
                    >
                      <div className='relative w-[30px] pt-[30px] md:w-[24px] md:pt-[24px]'>
                        <Image src='/assets/trash_white.png' alt='' layout='fill' objectFit='contain' />
                      </div>
                      <span className='text-white font-semibold text-[18px]'>Xóa hết yêu thích</span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
                    {userFavorite.store.map((store) => (
                      <RestaurantFavoriteCard key={store._id} store={store} />
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className='text-[#4A4B4D] text-[24px] font-bold my-[10px]'>Yêu thích trống</h3>
              )}
            </>
          ) : (
            <h3 className='text-[#4A4B4D] text-[24px] font-bold my-[10px]'>Đang tải...</h3>
          )}
        </div>

        <div className='md:hidden'>
          <NavBar page='favorite' />
        </div>
      </div>
      {showConfirm && (
        <ConfirmToast
          message='Bạn có chắc chắn muốn xóa hết yêu thích?'
          onConfirm={() => {
            handleRemoveAllFavorite();
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default page;
