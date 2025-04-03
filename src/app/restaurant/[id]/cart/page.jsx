"use client";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import OrderSummary from "../../../../components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useCompleteCartMutation,
  useGetDetailCartQuery,
  useGetUserCartInStoreQuery,
} from "../../../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useStoreLocation } from "../../../../context/StoreLocationContext";
import { haversineDistance } from "../../../../utils/functions";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN;

const page = () => {
  const router = useRouter();
  const { id: storeId } = useParams();
  const { storeLocation, setStoreLocation, storeId: storeLocationId, setStoreId } = useStoreLocation();

  const [cartPrice, setCartPrice] = useState(0);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const [completeCart, { data: orderData, isSuccess: completeCartSuccess }] = useCompleteCartMutation();

  const { data: detailCart, refetch: refetchDetailCart } = useGetUserCartInStoreQuery(storeId);

  useEffect(() => {
    if (!currentUser) {
      router.push("/home");
    }
  }, [currentUser]);

  useEffect(() => {
    setStoreId(storeId);
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
      setStoreLocation({
        address: data.features[0].place_name_vi,
        contactName: currentUser.name,
        contactPhonenumber: currentUser.phonenumber,
        detailAddress: "",
        name: "Vị trí hiện tại",
        note: "",
        lat: data.query[0],
        lon: data.query[1],
      });
    }
  };

  useEffect(() => {
    if (storeLocation.lon === 200 && currentUser) {
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
    if (storeLocation.lat === 200) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
    } else if (!storeLocation.contactName) {
      toast.error("Vui lòng nhập tên người nhận");
    } else if (!storeLocation.contactPhonenumber) {
      toast.error("Vui lòng nhập số điện thoại người nhận");
    } else {
      await completeCart({
        storeId,
        paymentMethod: "cash",
        deliveryAddress: storeLocation.address,
        customerName: storeLocation.contactName,
        customerPhonenumber: storeLocation.contactPhonenumber,
        detailAddress: storeLocation.detailAddress,
        note: storeLocation.note,
        location: [storeLocation.lat, storeLocation.lon],
      });
    }
  };

  useEffect(() => {
    if (completeCartSuccess) {
      toast.success("Đặt thành công");
      router.push(`/orders/order/${orderData.order._id}`);
    }
  }, [completeCartSuccess]);

  return (
    <>
      {detailCart && (
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
                {storeLocation && storeLocation.lat !== 200 && (
                  <p className='text-[#636464]'>
                    Khoảng cách tới chỗ bạn{" "}
                    {haversineDistance(
                      [storeLocation.lat, storeLocation.lon],
                      [detailCart.data.store.address.lat, detailCart.data.store.address.lon]
                    ).toFixed(2)}
                    km
                  </p>
                )}
              </div>
            </div>

            <div
              className='p-[20px] mt-[85px] md:mt-0'
              style={{ borderBottom: "6px solid #e0e0e0a3", borderTop: "6px solid #e0e0e0a3" }}
            >
              <p className='text-[#4A4B4D] text-[18px] font-bold pb-[15px]'>Giao tới</p>

              <div className=' flex flex-col gap-[15px]'>
                <Link href={`/account/location`} className='flex gap-[15px]'>
                  <Image src='/assets/location_active.png' alt='' width={20} height={20} className='object-contain' />
                  <div className='flex flex-1 items-center justify-between'>
                    <div>
                      <h3 className='text-[#4A4B4D] text-[18px] font-bold'>{storeLocation.name}</h3>
                      <p className='text-[#a4a5a8] line-clamp-1'>
                        {storeLocation.address || "Nhấn chọn để thêm địa chỉ giao hàng"}
                      </p>
                    </div>
                    <Image src='/assets/arrow_right.png' alt='' width={20} height={20} />
                  </div>
                </Link>

                <Link
                  href={`/restaurant/${storeId}/cart/edit-current-location`}
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
              <div className='pb-[15px] flex items-center justify-between'>
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
