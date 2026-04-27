"use client";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useGetDishQuery,
  useGetToppingFromDishQuery,
} from "../../../../../redux/features/dish/dishApi";
import ToppingItemCheckBox from "../../../../../components/dish/ToppingItemCheckBox";
import ToppingItemRadio from "../../../../../components/dish/ToppingItemRadio";
import {
  useGetUserCartQuery,
  useUpdateCartMutation,
} from "../../../../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Atom } from "react-loading-indicators";

const page = () => {
  const router = useRouter();
  const { id: storeId, dishId } = useParams();

  const [storeCart, setStoreCart] = useState(null);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cartItem, setCartItem] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [toppingsValue, setToppingsValue] = useState([]);
  const [price, setPrice] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.cart);

  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: dishInfo, isLoading } = useGetDishQuery(dishId);
  const { data: toppingGroups, refetch: refetchToppingGroups } =
    useGetToppingFromDishQuery(dishId);
  const [updateCart] = useUpdateCartMutation();

  useEffect(() => {
    if (currentUser) {
      refetchUserCart();
    }
  }, [currentUser, refetchUserCart]);

  useEffect(() => {
    if (userCart) {
      setStoreCart(userCart.find((cart) => cart.store._id === storeId));
    }
  }, [userCart]);

  useEffect(() => {
    refetchToppingGroups();
  }, []);

  useEffect(() => {
    if (storeCart) {
      const item = storeCart.items.find((item) => item.dish._id === dishId);
      setCartItem(item);
      setQuantity(item?.quantity || 0);
      if (item?.note) setNote(item.note);

      if (item?.toppings.length > 0) {
        item.toppings.forEach((topping) => {
          setToppings((prev) =>
            prev.includes(topping._id) ? prev : [...prev, topping._id]
          );
          setToppingsValue((prev) =>
            prev.some((tp) => tp._id === topping._id)
              ? prev
              : [...prev, { ...topping, groupId: topping.toppingGroup }]
          );
        });
      }
    }
  }, [storeCart]);

  useEffect(() => {
    if (cartItem) {
      const dishPrice = Number(cartItem.dish?.price || 0) * Number(cartItem.quantity);
      const toppingsPrice =
        (Array.isArray(cartItem.toppings)
          ? cartItem.toppings.reduce((sum, topping) => sum + Number(topping.price || 0), 0)
          : 0) * Number(cartItem.quantity);
      setPrice(dishPrice + toppingsPrice);
    }
  }, [cartItem]);

  const handleQuantityInputChange = (e) => {
    let inputValue = parseInt(e.target.value, 10);
    if (isNaN(inputValue)) { setQuantity(0); return; }
    if (inputValue > 50) { toast.info("Số lượng tối đa là 50. Đã tự động điều chỉnh."); inputValue = 50; }
    if (inputValue < 0) { toast.info("Số lượng tối thiểu là 0. Đã tự động điều chỉnh."); inputValue = 0; }
    setQuantity(inputValue);
    const dishPrice = Number(dishInfo.data?.price || 0) * inputValue;
    const toppingsPrice = toppingsValue.reduce((sum, t) => sum + Number(t.price || 0), 0) * inputValue;
    setPrice(dishPrice + toppingsPrice);
  };

  const handleChangeQuantity = (qnt) => {
    let newQuantity = quantity + qnt;
    if (newQuantity > 50) { toast.info("Số lượng tối đa là 50. Đã tự động điều chỉnh."); newQuantity = 50; }
    if (newQuantity < 0) { toast.info("Số lượng tối thiểu là 0. Đã tự động điều chỉnh."); newQuantity = 0; }
    setQuantity(newQuantity);
    const dishPrice = Number(dishInfo.data?.price || 0) * newQuantity;
    const toppingsPrice = toppingsValue.reduce((sum, t) => sum + Number(t.price || 0), 0) * newQuantity;
    setPrice(dishPrice + toppingsPrice);
  };

  const handleChooseTopping = (topping, toppingPrice, toppingGroup) => {
    const isRadio = toppingGroup.onlyOnce === true;

    if (isRadio) {
      setToppings((prev) =>
        prev.filter((id) => {
          const tp = toppingsValue.find((t) => t._id === id);
          return tp?.groupId !== toppingGroup._id;
        })
      );
      setToppingsValue((prev) => prev.filter((tp) => tp.groupId !== toppingGroup._id));

      const isSelected = toppingsValue.some((tp) => tp._id === topping._id);
      if (isSelected) {
        setPrice((prev) => prev - toppingPrice * quantity);
        return;
      }

      setToppings((prev) => [...prev, topping._id]);
      setToppingsValue((prev) => [...prev, { ...topping, groupId: toppingGroup._id }]);
      setPrice((prev) => prev + toppingPrice * quantity);
    } else {
      if (toppings.includes(topping._id)) {
        setToppings((prev) => prev.filter((id) => id !== topping._id));
        setToppingsValue((prev) => prev.filter((tp) => tp._id !== topping._id));
        setPrice((prev) => prev - toppingPrice * quantity);
      } else {
        setToppings((prev) => [...prev, topping._id]);
        setToppingsValue((prev) => [...prev, { ...topping, groupId: toppingGroup._id }]);
        setPrice((prev) => prev + toppingPrice * quantity);
      }
    }
  };

  const handleAddToCart = async () => {
    if (storeCart?.store?.openStatus === "CLOSED") {
      toast.error("Cửa hàng hiện đang đóng cửa, vui lòng quay lại sau!");
      return;
    }
    if (dishInfo.data?.stockStatus === "OUT_OF_STOCK") {
      toast.error("Món ăn này hiện đang hết hàng, vui lòng quay lại sau!");
      return;
    }
    if (currentUser) {
      try {
        await updateCart({ storeId, dishId, quantity, toppings, note }).unwrap();
        toast.success("Cập nhật giỏ hàng thành công");
        router.push(`/store/${storeId}`);
      } catch {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục đặt hàng!");
    }
  };

  const handleRemoveFromCart = async () => {
    if (currentUser) {
      try {
        await updateCart({ storeId, dishId, quantity: 0, toppings }).unwrap();
        toast.success("Cập nhật giỏ hàng thành công");
        router.push(`/store/${storeId}`);
      } catch {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục đặt hàng!");
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Atom color='#fc6011' size='medium' text='' textColor='' />
      </div>
    );
  }

  return (
    <>
      {dishInfo && (
        <>
          <div className='pb-[120px] md:pt-[75px] md:mt-[20px] bg-white dark:bg-gray-900 transition-colors duration-300'>
            <Heading title={dishInfo.data.name} description='' keywords='' />
            <div className='hidden md:block'>
              <Header />
            </div>

            <div className='relative bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-200 dark:md:border-gray-700 md:rounded-xl md:shadow-md md:overflow-hidden transition-colors'>
              <div className='absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-5 pt-5'>
                <Link
                  href={`/store/${storeId}`}
                  className='relative w-[40px] pt-[40px] rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
                >
                  <Image src='/assets/arrow_left_white.png' alt='' layout='fill' className='p-[8px]' />
                </Link>
              </div>

              <div className='relative pt-[50%] z-0 md:pt-[40%] lg:pt-[35%]'>
                <Image src={dishInfo.data.image.url || ''} alt='' layout='fill' objectFit='contain' />
              </div>

              <div className='p-5 border-b-[6px] border-gray-100 dark:border-gray-700'>
                <div className='flex justify-between'>
                  <h3
                    className='text-[#4A4B4D] dark:text-gray-100 text-[28px] font-bold line-clamp-2'
                    name='dishName'
                  >
                    {dishInfo.data.name}
                  </h3>
                  <span
                    className='text-[#4A4B4D] dark:text-gray-100 text-[28px] font-bold'
                    name='dishPrice'
                  >
                    {Number(dishInfo.data.price).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <p className='text-[#a4a5a8] dark:text-gray-400'>{dishInfo.data.description}</p>
              </div>

              {toppingGroups?.data?.length > 0 && (
                <div className='px-5 pb-5 border-b-[6px] border-gray-100 dark:border-gray-700'>
                  {toppingGroups.data.map((toppingGroup) => (
                    <div key={toppingGroup._id}>
                      <div className='flex gap-[10px] pt-5'>
                        <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[20px] font-bold'>
                          {toppingGroup.name}
                        </h3>
                      </div>
                      {toppingGroup.onlyOnce
                        ? toppingGroup.toppings.map((topping) => (
                            <ToppingItemRadio
                              name='toppingItems'
                              key={topping._id}
                              topping={topping}
                              toppingGroup={toppingGroup}
                              selectedTopping={toppingsValue}
                              handleChooseTopping={handleChooseTopping}
                            />
                          ))
                        : toppingGroup.toppings.map((topping) => (
                            <ToppingItemCheckBox
                              name='toppingItems'
                              key={topping._id}
                              topping={topping}
                              selectedTopping={toppingsValue}
                              toppingGroup={toppingGroup}
                              handleChooseTopping={handleChooseTopping}
                            />
                          ))}
                    </div>
                  ))}
                </div>
              )}

              <div className='p-5 border-b-[6px] border-gray-100 dark:border-gray-700'>
                <div className='pb-4'>
                  <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[20px] font-bold'>
                    Thêm lưu ý cho quán{' '}
                    <span className='text-[#a4a5a8] dark:text-gray-400 text-[16px] font-normal'>
                      (Không bắt buộc)
                    </span>
                  </h3>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className='p-[10px] w-full border border-gray-200 dark:border-gray-600 rounded-[10px] focus:ring-2 focus:ring-[#fc6011] resize-none bg-white dark:bg-gray-900 dark:text-gray-100 outline-none'
                  placeholder='Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán'
                  rows={3}
                />
              </div>

              <div className='p-5 flex items-center justify-center gap-4'>
                <button
                  name='decreaseQuantityBtn'
                  onClick={(e) => { e.preventDefault(); handleChangeQuantity(-1); }}
                  className='w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95'
                >
                  <Image src='/assets/minus.png' alt='Decrease' width={24} height={24} className='pointer-events-none' />
                </button>
                <input
                  type='number'
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  className='text-[#4A4B4D] dark:text-gray-100 text-2xl font-bold w-[70px] text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[#fc6011] transition-all duration-200'
                />
                <button
                  name='increaseQuantityBtn'
                  onClick={(e) => { e.preventDefault(); handleChangeQuantity(1); }}
                  className='w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#fc6011] to-[#ff7a33] shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95'
                >
                  <Image src='/assets/plus_active.png' alt='Increase' width={24} height={24} className='pointer-events-none' />
                </button>
              </div>
            </div>
          </div>

          <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 px-5 md:px-0 py-4 z-[100] flex items-center justify-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(255,255,255,0.05)] transition-colors'>
            {quantity > 0 ? (
              <div
                name='addCartBtn'
                className='flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#fc6011] to-[#ff7a33] text-white py-4 px-6 lg:w-[60%] md:w-[80%] w-full md:mx-auto cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
                onClick={handleAddToCart}
              >
                <span className='text-white text-xl font-semibold'>Thêm vào giỏ hàng</span>
                <span className='text-white text-xl font-semibold'>•</span>
                <span className='text-white text-xl font-semibold' name='totalPrice'>
                  {Number(price.toFixed(0)).toLocaleString("vi-VN")}đ
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-4 lg:w-[60%] md:w-[80%] w-full md:mx-auto'>
                <Link
                  href={`/store/${storeId}`}
                  className='flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#fc6011] to-[#ff7a33] text-white py-4 px-4 sm:px-6 cursor-pointer w-[65%] md:w-[80%] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
                >
                  <span className='text-white text-xl font-semibold'>Quay lại cửa hàng</span>
                </Link>
                <div
                  className='flex items-center justify-center gap-2 rounded-2xl bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-100 py-4 px-4 sm:px-6 cursor-pointer w-[35%] md:w-[20%] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
                  onClick={handleRemoveFromCart}
                >
                  <span className='text-gray-700 dark:text-gray-100 text-xl font-semibold whitespace-nowrap'>Bỏ chọn</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default page;
