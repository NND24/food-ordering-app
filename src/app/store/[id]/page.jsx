"use client";
import ListDishBig from "../../../components/dish/ListDishBig";
import ListDish from "../../../components/dish/ListDish";
import Header from "../../../components/header/Header";
import MostRatingSlider from "../../../components/rating/MostRatingSlider";
import RatingBar from "../../../components/rating/RatingBar";
import RatingItem from "../../../components/rating/RatingItem";
import Image from "next/image";
import Link from "next/link";
import Heading from "../../../components/Heading";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetStoreInformationQuery } from "../../../redux/features/store/storeApi";
import { useGetAllDishQuery } from "../../../redux/features/dish/dishApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserCartQuery } from "../../../redux/features/cart/cartApi";
import {
  useAddFavoriteMutation,
  useGetUserFavoriteQuery,
  useRemoveFavoriteMutation,
} from "../../../redux/features/favorite/favoriteApi";
import { useGetAllStoreRatingQuery } from "../../../redux/features/rating/ratingApi";
import Pagination from "../../../components/Pagination";
import { useSocket } from "../../../context/SocketContext";
import { Atom } from "react-loading-indicators";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../../components/MapView"), { ssr: false });

const page = () => {
  const { id: storeId } = useParams();
  const searchParams = useSearchParams();

  const [storeCart, setStoreCart] = useState(null);
  const [storeFavorite, setStoreFavorite] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [ratings, setRatings] = useState(0);

  const { notifications } = useSocket();

  const queryPage = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "6";

  const { currentUser } = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.cart);
  const { userFavorite } = useSelector((state) => state.favorite);

  const { refetch: refetchUserCart } = useGetUserCartQuery(undefined, {
    skip: !currentUser,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { refetch: refetchUserFavorite } = useGetUserFavoriteQuery(null, {
    skip: !currentUser,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: storeInfo, isLoading: storeLoading, refetch: refetchStoreInfo } = useGetStoreInformationQuery(storeId);
  const { data: allDish, refetch: refetchAllDish } = useGetAllDishQuery(storeId);
  const { data: allStoreRating, refetch: refetchAllStoreRating } = useGetAllStoreRatingQuery({
    storeId,
    sort: "",
    limit: "",
    page: "",
  });
  const { data: paginationRating, refetch: refetchPaginationRating } = useGetAllStoreRatingQuery({
    storeId,
    sort: "",
    limit,
    page: queryPage,
  });
  const { data: allStoreRatingDesc, refetch: refetchAllStoreRatingDesc } = useGetAllStoreRatingQuery({
    storeId,
    sort: "desc",
    limit: "5",
    page: "1",
  });

  useEffect(() => {
    if (allStoreRating) {
      const allRatings = allStoreRating.data.reduce(
        (acc, item) => {
          acc[item.ratingValue] = (acc[item.ratingValue] || 0) + 1;
          return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      );
      setRatings(allRatings);
    }
  }, [allStoreRating]);

  const [addFavorite, { isSuccess: addFavoriteSuccess }] = useAddFavoriteMutation();
  const [removeFavorite, { isSuccess: removeFavoriteSuccess }] = useRemoveFavoriteMutation();

  useEffect(() => {
    if (currentUser) {
      refetchUserCart();
      refetchUserFavorite();
    }
  }, [currentUser]);

  useEffect(() => {
    if (removeFavoriteSuccess || addFavoriteSuccess) {
      refetchUserFavorite();
    }
  }, [addFavoriteSuccess, removeFavoriteSuccess]);

  useEffect(() => {
    if (userCart) {
      setStoreCart(userCart.find((cart) => cart.store._id === storeId));
    } else {
      setStoreCart(null);
    }
  }, [userCart]);

  useEffect(() => {
    if (storeId) {
      refetchStoreInfo();
      refetchAllDish();
      refetchAllStoreRating();
      refetchAllStoreRatingDesc();
    }
  }, []);

  useEffect(() => {
    if (storeId) refetchPaginationRating();
  }, [queryPage, limit, storeId]);

  const calculateCartPrice = () => {
    if (!storeCart?.items) return;
    const { totalPrice, totalQuantity } = storeCart.items.reduce(
      (acc, item) => {
        const dishPrice = Number(item.dish?.price || 0) * Number(item.quantity || 0);
        const toppingsPrice =
          (Array.isArray(item.toppings)
            ? item.toppings.reduce((sum, topping) => sum + Number(topping.price || 0), 0)
            : 0) * Number(item.quantity || 0);
        acc.totalPrice += dishPrice + toppingsPrice;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
    setCartPrice(totalPrice);
    setCartQuantity(totalQuantity);
  };

  useEffect(() => {
    if (storeCart) calculateCartPrice();
  }, [storeCart]);

  useEffect(() => {
    if (userFavorite && Array.isArray(userFavorite.store)) {
      setStoreFavorite(userFavorite.store.some((s) => s._id === storeId));
    } else {
      setStoreFavorite(null);
    }
  }, [userFavorite]);

  const handleAddToFavorite = async () => {
    if (storeFavorite) {
      await removeFavorite(storeId);
    } else {
      await addFavorite(storeId);
    }
  };

  if (storeLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900'>
        <Atom color='#fc6011' size='medium' text='' textColor='' />
      </div>
    );
  }

  const store = storeInfo?.data;

  return (
    <>
      {store && (
        <div
          className={`bg-white dark:bg-gray-900 md:bg-[#f9f9f9] dark:md:bg-gray-950 dark:text-gray-100 transition-colors duration-300 ${
            cartQuantity > 0 ? "pb-[90px]" : ""
          }`}
        >
          <Heading title={store?.name} description='' keywords='' />
          <div className='hidden md:block'>
            <Header />
          </div>

          {/* Mobile Top Bar */}
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between p-[20px] bg-[#00000036] md:hidden'>
            <Link href='/home'>
              <Image src='/assets/arrow_left_white.png' alt='' width={30} height={30} />
            </Link>
            {currentUser && (
              <div className='relative flex items-center gap-[20px]'>
                <Image
                  src={`/assets/favorite${storeFavorite ? "-active" : "_white"}.png`}
                  alt=''
                  width={30}
                  height={30}
                  onClick={handleAddToFavorite}
                  className='cursor-pointer'
                />
                <Image src='/assets/notification_white.png' alt='' className='cursor-pointer' width={30} height={30} />
                {notifications.filter((n) => n.status === "unread").length > 0 && (
                  <div className='absolute top-[-6px] right-[-6px] w-[21px] h-[21px] text-center rounded-full bg-[#fc6011] border border-white flex items-center justify-center'>
                    <span className='text-[11px] text-white'>
                      {notifications.filter((n) => n.status === "unread").length}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Store Card */}
          <div className='bg-white dark:bg-gray-800 lg:w-[75%] md:w-[80%] md:mx-auto md:rounded-2xl md:shadow-md mb-6 overflow-hidden transition-colors duration-300'>
            {/* Cover */}
            <div className='relative pt-[45%] lg:pt-[30%] overflow-hidden'>
              <Image
                src={store?.cover?.url || "/assets/logo_app.png"}
                alt='Store Cover'
                layout='fill'
                loading='lazy'
                objectFit='cover'
                className='rounded-t-2xl transition-transform duration-300 hover:scale-105'
              />
            </div>

            {/* Info Card */}
            <div className='flex gap-5 mx-5 mt-[-50px] bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 relative z-10'>
              {/* Avatar */}
              <div className='relative w-[100px] h-[100px] rounded-xl overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-md flex-shrink-0'>
                <Image
                  src={store?.avatar?.url || "/assets/logo_app.png"}
                  alt='Store Avatar'
                  layout='fill'
                  loading='lazy'
                  objectFit='cover'
                />
              </div>

              {/* Info */}
              <div className='flex flex-1 items-start justify-between min-w-0'>
                <div className='flex flex-col min-w-0 gap-1'>
                  <span className='text-[#4A4B4D] dark:text-gray-100 text-xl font-bold truncate'>{store?.name}</span>

                  {/* Categories */}
                  <div className='flex items-center flex-wrap gap-1'>
                    {store?.storeCategory?.map((category, index) => (
                      <div className='flex items-center gap-[4px]' key={category._id}>
                        <Link
                          href={`/search?category=${category._id}`}
                          className='text-gray-500 dark:text-gray-200 text-sm hover:text-[#fc6011] transition'
                        >
                          {category.name}
                        </Link>
                        {index !== store.storeCategory.length - 1 && (
                          <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  {store?.avgRating != 0 && (
                    <div className='flex items-center gap-[6px]'>
                      <Image src='/assets/star_active.png' alt='' width={16} height={16} />
                      <span className='text-[#fc6011] text-sm font-semibold'>{store?.avgRating?.toFixed(2)}</span>
                      {store?.amountRating != 0 && (
                        <span className='text-gray-500 dark:text-gray-400 text-sm'>{`(${store?.amountRating} đánh giá)`}</span>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {store?.description && (
                    <span className='text-gray-500 dark:text-gray-400 text-sm line-clamp-1'>{store?.description}</span>
                  )}

                  {/* Open hours + Status */}
                  {store?.openHour && store?.closeHour && (
                    <div className='flex flex-wrap items-center gap-2 text-sm'>
                      <span className='text-gray-500 dark:text-gray-400'>
                        {`Giờ mở cửa: ${store.openHour} - ${store.closeHour}`}
                      </span>
                      {store.openStatus && (
                        <span
                          className={`inline-flex items-center px-3 py-[3px] rounded-full text-xs font-semibold shadow-md border transition-all duration-300
                          ${
                            store.openStatus === "OPEN"
                              ? "bg-green-500/60 border-green-400 text-white"
                              : "bg-red-500/60 border-red-400 text-white"
                          }`}
                        >
                          {store.openStatus === "OPEN" ? "Đang mở cửa" : "Đã đóng cửa"}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Address */}
                  {store?.address && (
                    <span className='text-gray-500 dark:text-gray-400 text-sm line-clamp-1'>
                      {store?.address.full_address}
                    </span>
                  )}
                </div>

                {/* Favorite (Desktop) */}
                {currentUser && (
                  <div className='hidden md:block flex-shrink-0'>
                    <button onClick={handleAddToFavorite} className='p-2 rounded-full hover:scale-110 transition'>
                      <Image
                        src={`/assets/favorite${storeFavorite ? "-active" : ""}.png`}
                        alt='favorite'
                        width={28}
                        height={28}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className='md:p-[20px] mt-[20px]'>
              {allDish && (
                <div className='mb-[20px] px-[20px] md:px-0'>
                  <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[24px] font-bold'>Dành cho bạn</h3>
                  <ListDishBig
                    storeInfo={storeInfo}
                    allDish={allDish?.data}
                    cartItems={storeCart ? storeCart?.items : []}
                  />
                </div>
              )}

              {allDish && (
                <div className='my-[20px] px-[20px] md:px-0'>
                  <ListDish
                    storeInfo={storeInfo}
                    allDish={allDish?.data}
                    cartItems={storeCart ? storeCart?.items : []}
                  />
                </div>
              )}

              {/* Map */}
              {store?.address?.lat && store?.address?.lon && (
                <div className='w-full h-[150px] my-4 px-[20px] md:px-0 relative rounded-xl overflow-hidden shadow-md z-10'>
                  <MapView lat={store.address.lat} lon={store.address.lon} address={store.address.full_address} />
                </div>
              )}

              {/* Ratings */}
              {allStoreRating &&
                allStoreRatingDesc &&
                paginationRating &&
                allStoreRating?.data?.length > 0 &&
                allStoreRatingDesc?.data?.length > 0 &&
                paginationRating?.data?.length > 0 &&
                ratings && (
                  <>
                    <div className='py-5 px-[20px] bg-gray-100 dark:bg-gray-800 md:rounded-xl mb-4 shadow-inner'>
                      <div className='flex items-center justify-between pb-3'>
                        <h3 className='text-[#4A4B4D] dark:text-gray-100 text-xl font-bold'>Mọi người nhận xét</h3>
                        <Link href={`/store/${storeId}/rating`} className='block md:hidden'>
                          <Image
                            src='/assets/arrow_right_long.png'
                            alt='arrow'
                            width={40}
                            height={40}
                            className='bg-white dark:bg-gray-700 p-2 rounded-full shadow-md'
                          />
                        </Link>
                      </div>
                      <MostRatingSlider allStoreRatingDesc={allStoreRatingDesc.data} />
                    </div>

                    <div className='hidden md:block'>
                      <RatingBar ratings={ratings} />
                      {paginationRating?.data.map((rating) => (
                        <RatingItem
                          key={rating._id}
                          rating={rating}
                          currentUser={currentUser}
                          refetchAllStoreRating={refetchAllStoreRating}
                          refetchPaginationRating={refetchPaginationRating}
                          refetchAllStoreRatingDesc={refetchAllStoreRatingDesc}
                        />
                      ))}
                      {paginationRating && (
                        <Pagination page={queryPage} limit={limit} total={paginationRating.total} />
                      )}
                    </div>
                  </>
                )}
            </div>
          </div>

          {/* Floating Cart Button */}
          {cartQuantity > 0 && storeCart && (
            <Link
              name='cartDetailBtn'
              href={`/store/${storeId}/cart`}
              className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 px-[20px] py-[15px] z-[100] flex items-center justify-center transition-colors duration-300'
            >
              <div
                className='flex items-center justify-between
                rounded-xl
                bg-gradient-to-r from-[#fc6011] to-[#ff7e3c]
                text-white py-4 px-6
                lg:w-[75%] md:w-[80%] w-full md:mx-auto
                shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300'
              >
                <div className='flex items-center gap-2'>
                  <span className='text-lg md:text-xl font-semibold'>Giỏ hàng</span>
                  <div className='w-[5px] h-[5px] rounded-full bg-white'></div>
                  <span className='text-lg md:text-xl font-semibold'>{cartQuantity} món</span>
                </div>
                <span className='text-lg md:text-xl font-bold bg-white/20 px-3 py-1 rounded-md'>
                  {Number(cartPrice.toFixed(0)).toLocaleString("vi-VN")}đ
                </span>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default page;
