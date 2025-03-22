"use client";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import OrderSummary from "../../../../../components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useParams, useRouter } from "next/navigation";
import { useCompleteCartMutation, useGetDetailCartQuery } from "../../../../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN;

const page = () => {
  const router = useRouter();

  const { id: storeId, cardId } = useParams();
  const [currentLocation, setCurrentLocation] = useState();
  const [cartPrice, setCartPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhonenumber, setCustomerPhonenumber] = useState("");

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const [completeCart, { isSuccess: completeCartSuccess }] = useCompleteCartMutation();

  const {
    data: detailCart,
    refetch: refetchDetailCart,
    isSuccess: getDetailCartSuccess,
  } = useGetDetailCartQuery(storeId);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
    } else {
      router.push("/home");
    }
  }, [currentUser]);

  useEffect(() => {
    refetchDetailCart();
  }, []);

  useEffect(() => {
    if (detailCart) {
      calculateCartPrice();
    }
  }, [detailCart]);

  const fetchPlaceName = async (lon, lat) => {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?` +
        `access_token=${mapboxgl.accessToken}&language=vi&country=VN`
    );
    const data = await res.json();
    if (data.features.length > 0) {
      setCurrentLocation(data);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;
          fetchPlaceName(userLon, userLat);
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        }
      );
    }
  }, []);

  const calculateCartPrice = () => {
    const { totalPrice, totalQuantity } = detailCart.data.items.reduce(
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
  };

  const handleCompleteCart = async () => {
    await completeCart({ storeId, paymentMethod: "cash", deliveryAddress: "Quận 9", location: [-74.0059, 40.7127] });
  };

  useEffect(() => {
    if (completeCartSuccess) {
      toast.success("Đặt thành công");
      router.push("/home");
    }
  }, [completeCartSuccess]);

  return (
    <>
      {currentLocation && detailCart && (
        <div className='pt-[20px] pb-[140px] md:bg-[#f9f9f9] md:pt-[110px]'>
          <Heading title='Giỏ hàng' description='' keywords='' />
          <div className='hidden md:block'>
            <Header />
          </div>

          <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
            <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static md:gap-[20px]'>
              <div className='relative w-[30px] pt-[30px] md:hidden'>
                <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
              </div>
              <div className='relative w-[70px] pt-[70px] hidden md:block'>
                <Image
                  src={detailCart.data.store.avatar.url}
                  alt=''
                  layout='fill'
                  objectFit='cover'
                  className='rounded-[8px]'
                />
              </div>
              <div>
                <h3 className='text-[#4A4B4D] text-[24px] font-bold'>{detailCart.data.store.name}</h3>
                {/* <p className='text-[#636464]'>Khoảng cách tới chỗ bạn 6,9km</p> */}
              </div>
            </div>

            <div
              className='p-[20px] mt-[85px] md:mt-0'
              style={{ borderBottom: "6px solid #e0e0e0a3", borderTop: "6px solid #e0e0e0a3" }}
            >
              <p className='text-[#4A4B4D] text-[18px] font-bold pb-[20px]'>Giao tới</p>

              <div
                className={`relative flex items-center bg-[#f5f5f5] text-[#636464] rounded-[15px] gap-[8px] border border-solid border-[#7a7a7a] overflow-hidden`}
              >
                <Image
                  src='/assets/account.png'
                  alt=''
                  width={20}
                  height={20}
                  className='absolute top-[50%] left-[10px] translate-y-[-50%]'
                />
                <input
                  type='text'
                  name='name'
                  placeholder='Nhập tên người nhận'
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className='bg-[#f5f5f5] text-[18px] py-[10px] pr-[10px] pl-[35px] w-full'
                />
              </div>

              <div
                className={`relative flex items-center bg-[#f5f5f5] text-[#636464] rounded-[15px] gap-[8px] border border-solid border-[#7a7a7a] overflow-hidden mt-[10px]`}
              >
                <Image
                  src='/assets/phone.png'
                  alt=''
                  width={20}
                  height={20}
                  className='absolute top-[50%] left-[10px] translate-y-[-50%]'
                />
                <input
                  type='text'
                  name='phonenumber'
                  placeholder='Nhập số điện thoại người nhận'
                  value={customerPhonenumber}
                  onChange={(e) => setCustomerPhonenumber(e.target.value)}
                  className='bg-[#f5f5f5] text-[18px] py-[10px] pr-[10px] pl-[35px] w-full'
                />
              </div>

              <div className=' flex flex-col gap-[15px] mt-[10px]'>
                <Link href='/restaurant/123/cart/321/location' className='flex gap-[15px]'>
                  <Image src='/assets/location_active.png' alt='' width={20} height={20} className='object-contain' />
                  <div className='flex flex-1 items-center justify-between'>
                    <div>
                      <h3 className='text-[#4A4B4D] text-[18px] font-bold'>{currentLocation.features[1].text}</h3>
                      <p className='text-[#a4a5a8] line-clamp-1'>{currentLocation.features[1].place_name}</p>
                    </div>
                    <Image src='/assets/arrow_right.png' alt='' width={20} height={20} />
                  </div>
                </Link>

                <Link
                  href='/restaurant/123/cart/321/edit-current-location'
                  className='p-[10px] rounded-[6px] flex items-center justify-between bg-[#e0e0e0a3]'
                >
                  <span className='text-[#4A4B4D]'>Thêm chi tiết địa chỉ và hướng dẫn giao hàng</span>
                  <span className='text-[#0054ff] font-semibold'>Thêm</span>
                </Link>
              </div>
            </div>

            <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              <OrderSummary detailItems={detailCart.data.items} price={cartPrice} />
            </div>

            <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              <div className='pb-[20px] flex items-center justify-between'>
                <span className='text-[#4A4B4D] text-[18px] font-bold'>Thông tin thanh toán</span>
              </div>

              {/* <div className='flex gap-[15px] mb-[10px]'>
                <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/credit_card.png' alt='' layout='fill' objectFit='contain' />
                </div>
                <div className='flex flex-1 items-center justify-between'>
                  <div className='flex items-center gap-[8px]'>
                    <h3 className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Thẻ</h3>
                    <span className='text-[#a4a5a8] px-[8px] py-[6px] rounded-full bg-[#e0e0e0a3] md:text-[14px] md:px-[6px]'>
                      Đề xuất
                    </span>
                  </div>
                  <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px] cursor-pointer'>
                    <Image src='/assets/button.png' alt='' layout='fill' objectFit='contain' />
                  </div>
                </div>
              </div> */}

              <div className='flex gap-[15px]'>
                <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/money.png' alt='' layout='fill' objectFit='contain' />
                </div>
                <div className='flex flex-1 items-center justify-between'>
                  <div className='flex items-center gap-[8px]'>
                    <h3 className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Tiền mặt</h3>
                  </div>
                  <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px] cursor-pointer'>
                    <Image src='/assets/button_active.png' alt='' layout='fill' objectFit='contain' />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              <span className='text-[#4A4B4D] text-[18px] font-bold'>Ưu đãi</span>

              <Link href='/restaurant/123/coupons' className='flex gap-[15px] mb-[10px] mt-[20px]'>
                <div className='relative w-[30px] pt-[30px]'>
                  <Image src='/assets/marketing.png' alt='' layout='fill' objectFit='contain' />
                </div>
                <div className='flex flex-1 items-center justify-between'>
                  <span className='text-[#4A4B4D] text-[18px]'>Sử dụng ưu đãi hoặc mã khuyến mãi</span>
                  <div className='relative w-[20px] pt-[20px]'>
                    <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
                  </div>
                </div>
              </Link>
            </div> */}

            <div className='p-[20px]' style={{ borderBottom: "6px solid #e0e0e0a3" }}>
              <span className='text-[#4A4B4D] text-[16px]'>
                Bằng việc đặt đơn này, bạn đã đồng ý Điều khoản Sử dụng và Quy chế hoạt động của chúng tôi
              </span>
            </div>
          </div>

          <div className='fixed bottom-0 left-0 right-0 bg-[#fff] p-[15px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
            <div className='flex items-center justify-between pb-[8px] lg:w-[60%] md:w-[80%] md:mx-auto'>
              <span className='text-[#000] text-[18px]'>Tổng cộng</span>
              <span className='text-[#4A4B4D] text-[24px] font-semibold'>{cartPrice.toFixed(0)}đ</span>
            </div>
            <div
              onClick={handleCompleteCart}
              className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[10px] md:px-[10px] lg:w-[60%] md:w-[80%] md:mx-auto cursor-pointer'
            >
              <span className='text-[#fff] text-[20px] font-semibold md:text-[18px]'>Đặt đơn</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
