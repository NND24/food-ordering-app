"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import NavBar from "../../components/NavBar";
import RestaurantFavoriteCard from "../../components/restaurant/RestaurantFavoriteCard";
import React, { useEffect } from "react";
import { useGetUserFavoriteQuery, useRemoveAllFavoriteMutation } from "../../redux/features/favorite/favoriteApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Atom } from "react-loading-indicators";
import { useTranslation } from "../../hooks/useTranslation";

const page = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const { userFavorite } = useSelector((state) => state.favorite);

  const { isLoading, refetch } = useGetUserFavoriteQuery(null, {
    skip: !currentUser,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const [removeAllFavorite, { isSuccess: removeSuccess }] = useRemoveAllFavoriteMutation();

  useEffect(() => {
    if (removeSuccess) {
      refetch();
      toast.success(t("favorite.clearSuccess"));
    }
  }, [removeSuccess]);

  const confirmRemoveAllFavorite = async () => {
    const result = await Swal.fire({
      title: t("favorite.clearConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.agree"),
      cancelButtonText: t("common.cancel"),
    });
    if (result.isConfirmed) await removeAllFavorite();
  };

  return (
    <div className='pt-[10px] pb-[100px] md:pt-[90px] md:px-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300'>
      <Heading title='Yêu thích' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='favorite' />
      </div>

      <MobileHeader page='favorite' />

      <div className='md:w-[90%] md:mx-auto px-[20px]'>
        {isLoading ? (
          <div className='w-full flex items-center justify-center py-20'>
            <Atom color='#fc6011' size='medium' text='' textColor='' />
          </div>
        ) : userFavorite && userFavorite.store?.length > 0 ? (
          <div className='my-[20px]'>
            <div className='flex items-center justify-between mb-[20px]'>
              <h3 className='text-[24px] font-bold hidden md:block text-[#4A4B4D] dark:text-gray-100'>
                {t("favorite.storeList")}
              </h3>
              <button
                className='flex items-center justify-center gap-[10px] p-[8px] rounded-[6px] bg-gradient-to-r from-[#fc6011] to-[#ff8533] cursor-pointer ml-auto md:ml-0 shadow-md hover:shadow-lg hover:scale-105 transition'
                onClick={confirmRemoveAllFavorite}
              >
                <div className='relative w-[24px] pt-[24px]'>
                  <Image src='/assets/trash_white.png' alt='' layout='fill' objectFit='contain' />
                </div>
                <span className='text-white font-semibold text-[18px]'>{t("favorite.clearAll")}</span>
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
              {userFavorite.store.map((store) => (
                <RestaurantFavoriteCard key={store._id} store={store} />
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center text-center py-10'>
            <h3 className='text-[24px] font-bold my-[10px] text-[#4A4B4D] dark:text-gray-100'>
              {t("favorite.emptyTitle")}
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>{t("favorite.emptyDesc2")}</p>
            <Link
              href='/search'
              className='px-6 py-3 bg-[#fc6011] text-white rounded-full shadow hover:scale-105 transition-transform'
            >
              {t("favorite.explore")}
            </Link>
          </div>
        )}
      </div>

      <div className='md:hidden'>
        <NavBar page='favorite' />
      </div>
    </div>
  );
};

export default page;
