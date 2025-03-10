"use client";
import ListDishBig from "../../../components/dish/ListDishBig";
import ListDish from "../../../components/dish/ListDish";
import Header from "../../../components/header/Header";
import MostRatingReviewSlider from "../../../components/review/MostRatingReviewSlider";
import RatingBar from "../../../components/review/RatingBar";
import ReviewItem from "../../../components/review/ReviewItem";
import Image from "next/image";
import Link from "next/link";
import Heading from "../../../components/Heading";
import { useParams } from "next/navigation";
import { useGetStoreInformationQuery } from "../../../redux/features/store/storeApi";
import { useGetAllDishQuery } from "../../../redux/features/dish/dishApi";
import { useEffect, useState } from "react";
import { useGetUserCartInStoreQuery } from "../../../redux/features/cart/cartApi";

const ratings = {
  5: 50,
  4: 30,
  3: 15,
  2: 5,
  1: 10,
};

const page = () => {
  const { id: storeId } = useParams();

  const [cart, setCart] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  const { data: storeInfo, refetch: refetchStoreInfo } = useGetStoreInformationQuery(storeId);
  const { data: allDish, refetch: refetchAllDish } = useGetAllDishQuery(storeId);
  const {
    data: cartStore,
    refetch: refetchCartStore,
    isSuccess: getUserCartSuccess,
  } = useGetUserCartInStoreQuery(storeId);

  useEffect(() => {
    if (cartStore) {
      console.log("cartStore: ", cartStore);
      setCart(cartStore.data);
    }
  }, [cartStore, getUserCartSuccess]);

  useEffect(() => {
    if (storeId) {
      refetchStoreInfo();
      refetchAllDish();
      refetchCartStore();
    }
  }, []);

  const calculateCartPrice = () => {
    const { totalPrice, totalQuantity } = cartStore.data.items.reduce(
      (acc, item) => {
        const dishPrice = (item.dish?.price || 0) * item.quantity;
        const toppingsPrice =
          (Array.isArray(item.toppings) ? item.toppings.reduce((sum, topping) => sum + (topping.price || 0), 0) : 0) *
          item.quantity;

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
    if (cart) {
      console.log("cart:", cart);
      console.log("allDish:", allDish);
      calculateCartPrice();
    }
  }, [cart]);

  return (
    <>
      {storeInfo && allDish && (
        <div className={`pb-[90px] md:pt-[34px] md:bg-[#f9f9f9]`}>
          <Heading title={storeInfo?.data?.name} description='' keywords='' />
          <div className='hidden md:block'>
            <Header />
          </div>

          <div className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-[20px] pt-[20px] md:hidden'>
            <Image src='/assets/arrow_left_white.png' alt='' width={30} height={30} />
            <div className='flex items-center gap-[20px]'>
              <Image src='/assets/favorite_white.png' alt='' width={30} height={30} />
              <Image src='/assets/notification_white.png' alt='' width={30} height={30} />
            </div>
          </div>

          <div className='bg-[#fff] lg:w-[75%] md:w-[80%] pb-[20px] mb-[20px] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
            <div className='relative pt-[50%] z-0 lg:pt-[35%] rounded-br-[8px] rounded-bl-[8px] overflow-hidden'>
              <Image src={storeInfo?.data?.cover?.url || ""} alt='' layout='fill' objectFit='cover' />
            </div>

            <div className='flex gap-[25px] my-[20px] mx-[20px] items-start bg-[#fff] translate-y-[-60%] mb-[-10%] p-[10px] rounded-[6px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
              <div className='relative flex flex-col gap-[4px] w-[90px] pt-[90px] md:w-[120px] md:pt-[120px]'>
                <Image
                  src={storeInfo?.data?.avatar?.url || ""}
                  alt=''
                  layout='fill'
                  objectFit='cover'
                  className='rounded-[8px]'
                />
              </div>

              <div className='flex flex-1 items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[#4A4B4D] text-[20px] font-semibold'>{storeInfo?.data?.name}</span>

                  <div className='flex items-center gap-[6px]'>
                    {storeInfo?.data?.storeCategory.map((category, index) => (
                      <div className='flex items-center gap-[6px]' key={category._id}>
                        <span className='text-[#636464]'>{category.name}</span>
                        {index !== storeInfo?.data.storeCategory.length - 1 && (
                          <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className='flex items-center gap-[6px]'>
                    {storeInfo?.data?.avgRating != 0 && (
                      <>
                        <Image src='/assets/star_active.png' alt='' width={20} height={20} />
                        <span className='text-[#fc6011]'>{storeInfo?.data?.avgRating.toFixed(2)}</span>
                      </>
                    )}
                    {storeInfo?.data?.amountRating != 0 && (
                      <span className='text-[#636464]'>{`(${storeInfo?.data?.amountRating} đánh giá)`}</span>
                    )}
                  </div>

                  <span className='text-[#636464] pt-[4px]'>{storeInfo?.data?.description}</span>
                </div>
              </div>
            </div>

            <div className='md:p-[20px]'>
              <div className='my-[20px] px-[20px] md:px-0 lg:mt-[60px]'>
                <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Dành cho bạn</h3>
                <ListDishBig
                  storeId={storeId}
                  allDish={allDish?.data}
                  cartItems={cart?.items}
                  refetchCartStore={refetchCartStore}
                />
              </div>

              <div className='my-[20px] px-[20px] md:px-0'>
                <ListDish
                  storeId={storeId}
                  allDish={allDish?.data}
                  cartItems={cart?.items}
                  refetchCartStore={refetchCartStore}
                />
              </div>

              <div className='p-[20px] bg-[#e6e6e6] md:rounded-[10px]'>
                <div className='flex items-center justify-between pb-[10px]'>
                  <h3 className='text-[#4A4B4D] text-[24px] font-bold pb-[10px]'>Mọi người nhận xét</h3>
                  <Link href='/restaurant/123/reviews' className='block md:hidden'>
                    <Image
                      src='/assets/arrow_right_long.png'
                      alt=''
                      width={40}
                      height={40}
                      className='bg-[#fff] p-[8px] rounded-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
                    />
                  </Link>
                </div>

                <MostRatingReviewSlider />
              </div>

              <div className='hidden md:block'>
                <RatingBar ratings={ratings} />
                <ReviewItem />
              </div>
            </div>
          </div>
          {cartQuantity > 0 && cart && (
            <Link
              href={`/restaurant/${storeId}/cart/${cart._id}`}
              className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100] flex items-center justify-center'
            >
              <div className='flex items-center justify-between rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] lg:w-[75%] md:w-[80%] w-full md:mx-auto'>
                <div className='flex items-center gap-[8px]'>
                  <span className='text-[#fff] text-[20px] font-semibold'>Giỏ hàng</span>
                  <div className='w-[4px] h-[4px] rounded-full bg-[#fff]'></div>
                  <span className='text-[#fff] text-[20px] font-semibold'>{cartQuantity} món</span>
                </div>
                <span className='text-[#fff] text-[20px] font-semibold'>{cartPrice.toFixed(0)}đ</span>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default page;
