"use client";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import OrderSummary from "../../../../components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useCompleteCartMutation,
  useGetDetailCartQuery,
  useGetUserCartQuery,
} from "../../../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useStoreLocation } from "../../../../context/StoreLocationContext";
import { useVoucher } from "../../../../context/VoucherContext";
import { useSocket } from "../../../../context/SocketContext";
import { haversineDistance } from "../../../../utils/functions";
import { useTheme } from "next-themes";
import { useTranslation } from "../../../../hooks/useTranslation";

const page = () => {
  const router = useRouter();
  const { id: storeId } = useParams();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { storeLocation, setStoreLocation, setStoreId } = useStoreLocation();
  const { storeVouchers, clearVouchers } = useVoucher();
  const { sendNotification } = useSocket();

  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const shippingFee = 0;

  const selectedVouchers = storeVouchers[storeId] || [];

  const { currentUser } = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.cart);

  const cartDocument = Array.isArray(userCart) ? userCart.find((c) => c.store._id === storeId) : null;
  const cartId = cartDocument?._id;

  const [completeCart, { data: orderData, isSuccess: completeCartSuccess, isError: completeCartIsError, error: completeCartError }] = useCompleteCartMutation();
  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const { data: detailCart, refetch: refetchDetailCart } = useGetDetailCartQuery(cartId, {
    skip: !cartId,
  });

  useEffect(() => {
    if (!currentUser) router.push("/home");
  }, [currentUser]);

  useEffect(() => {
    setStoreId(storeId);
    refetchUserCart();
  }, []);

  useEffect(() => {
    if (detailCart) calculateCartPrice();
  }, [detailCart]);

  const calculateCartPrice = () => {
    const { totalPrice } = detailCart.data.items.reduce(
      (acc, item) => {
        const dishPrice = (item.dish?.price || 0) * item.quantity;
        const toppingsPrice =
          (Array.isArray(item.toppings) ? item.toppings.reduce((sum, t) => sum + (t.price || 0), 0) : 0) *
          item.quantity;
        acc.totalPrice += dishPrice + toppingsPrice;
        return acc;
      },
      { totalPrice: 0 }
    );
    setSubtotalPrice(totalPrice);
  };

  const totalDiscount = (() => {
    if (!detailCart || !selectedVouchers.length) return 0;
    let discount = 0;
    selectedVouchers.forEach((voucher) => {
      if (voucher.minOrderAmount && subtotalPrice < voucher.minOrderAmount) return;
      if (voucher.discountType === "PERCENTAGE") {
        let d = (subtotalPrice * voucher.discountValue) / 100;
        if (voucher.maxDiscount) d = Math.min(d, voucher.maxDiscount);
        discount += d;
      } else if (voucher.discountType === "FIXED") {
        discount += voucher.discountValue;
      }
    });
    return Math.min(discount, subtotalPrice);
  })();

  const fetchPlaceName = async (lon, lat) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=vi`;
    try {
      const res = await fetch(url, { headers: { "User-Agent": "food-ordering-app" } });
      const data = await res.json();
      if (data) {
        setStoreLocation({
          address: data.display_name,
          contactName: currentUser.name,
          contactPhonenumber: currentUser.phonenumber,
          detailAddress: "",
          name: t("cart.currentLocation"),
          note: "",
          lat,
          lon,
        });
      }
    } catch {}
  };

  useEffect(() => {
    if (storeLocation.lon === 200 && currentUser) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => fetchPlaceName(pos.coords.longitude, pos.coords.latitude),
          (err) => { if (err?.code || err?.message) console.warn("Không lấy được vị trí:", err.message || err.code); }
        );
      }
    }
  }, []);

  const warningShownRef = useRef(false);
  useEffect(() => {
    if (
      !warningShownRef.current &&
      storeLocation?.lat !== 200 &&
      detailCart?.data?.store?.address?.lat
    ) {
      const distance = haversineDistance(
        [storeLocation.lat, storeLocation.lon],
        [detailCart.data.store.address.lat, detailCart.data.store.address.lon]
      );
      if (distance > 20) {
        toast.warn(t("cart.distanceWarning"));
        warningShownRef.current = true;
      }
    }
  }, [storeLocation, detailCart]);

  const handleCompleteCart = async () => {
    if (detailCart?.data?.store?.openStatus === "CLOSED") {
      toast.error(t("cart.storeClosedError"));
      return;
    }

    const outOfStockItems = detailCart?.data?.items?.filter((item) => item.dish?.status === "OUT_OF_STOCK") || [];
    if (outOfStockItems.length > 0) {
      toast.error(t("cart.outOfStockError"));
      return;
    }

    if (!storeLocation?.lat || storeLocation.lat === 200) {
      toast.error(t("cart.selectAddressError"));
      return;
    }
    if (!storeLocation?.contactName?.trim()) {
      toast.error(t("cart.enterNameError"));
      return;
    }
    if (!storeLocation?.contactPhonenumber?.trim()) {
      toast.error(t("cart.enterPhoneError"));
      return;
    }

    await completeCart({
      storeId,
      paymentMethod: "cash",
      deliveryAddress: storeLocation.address,
      customerName: storeLocation.contactName,
      customerPhonenumber: storeLocation.contactPhonenumber,
      detailAddress: storeLocation.detailAddress,
      note: storeLocation.note,
      location: [storeLocation.lon, storeLocation.lat],
      vouchers: selectedVouchers.map((v) => v._id),
      shippingFee,
    });
  };

  useEffect(() => {
    if (completeCartSuccess) {
      if (orderData?.success === false) {
        toast.error(orderData.message || t("cart.placeOrderFail"));
        return;
      }
      toast.success(t("cart.placeOrderSuccess"));
      refetchUserCart();
      clearVouchers(storeId);

      const orderId = orderData?.orderId || orderData?.order?._id;
      if (orderId) {
        sendNotification({
          storeId,
          title: "Có đơn hàng mới",
          message: "Vui lòng xác nhận đơn hàng",
          orderId,
          type: "order",
        });
        router.push(`/orders/detail-order/${orderId}`);
      }
    }
  }, [completeCartSuccess]);

  useEffect(() => {
    if (completeCartIsError) {
      const msg = completeCartError?.data?.message || t("cart.placeOrderFail");
      toast.error(msg);
    }
  }, [completeCartIsError]);

  if (!detailCart) return null;

  return (
    <div className='pt-[20px] pb-[140px] bg-white dark:bg-gray-900 md:pt-[110px] transition-colors duration-300'>
      <Heading title={t("cart.title")} description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='lg:w-[60%] md:w-[80%] md:mx-auto'>
        {/* Store header */}
        <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6 transition'>
          <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-white dark:bg-gray-800 h-[85px] p-5 md:static md:gap-[20px] border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6 transition'>
            <Link href={`/store/${storeId}`} className='relative w-[30px] pt-[30px] md:hidden'>
              <Image src={`/assets/arrow_left_long${theme === "dark" ? "_white" : ""}.png`} alt='' layout='fill' objectFit='contain' />
            </Link>
            <Link href={`/store/${storeId}`} className='relative w-[70px] pt-[70px] rounded-[8px] overflow-hidden hidden md:block'>
              <Image src={detailCart.data.store.avatar.url} alt='' layout='fill' objectFit='cover' />
            </Link>
            <div>
              <Link href={`/store/${storeId}`} className='text-[#4A4B4D] dark:text-gray-100 text-[24px] font-bold line-clamp-1 block'>
                {detailCart.data.store.name}
              </Link>
              {storeLocation?.lat !== 200 && detailCart.data.store.address?.lat && (
                <p className='text-[#636464] dark:text-gray-400'>
                  {t("cart.distanceTo")}{" "}
                  {haversineDistance(
                    [storeLocation.lat, storeLocation.lon],
                    [detailCart.data.store.address.lat, detailCart.data.store.address.lon]
                  ).toFixed(2)}
                  km
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full' />

        {/* Delivery address */}
        <div className='mt-[85px] md:mt-0 bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md transition'>
          <p className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold pb-[15px]'>{t("cart.deliverTo")}</p>
          <div className='flex flex-col gap-[15px]'>
            <Link href='/account/location' className='flex gap-[15px]'>
              <Image src='/assets/location_active.png' alt='' width={20} height={20} className='object-contain' />
              <div className='flex flex-1 items-center justify-between'>
                <div>
                  <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold'>{storeLocation.name}</h3>
                  <p className='text-[#a4a5a8] dark:text-gray-400 line-clamp-1'>
                    {storeLocation.address || t("cart.clickToAdd")}
                  </p>
                </div>
                <Image
                  src={`/assets/arrow_right${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link
              href={`/store/${storeId}/cart/edit-current-location`}
              className='p-[10px] rounded-[6px] flex items-center justify-between bg-gray-100 dark:bg-gray-700'
            >
              <span className='text-[#4A4B4D] dark:text-gray-100'>{t("cart.addDetail")}</span>
              <span className='text-[#0054ff] font-semibold'>{t("cart.addDetailBtn")}</span>
            </Link>
          </div>
        </div>

        <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full' />

        {/* Payment method */}
        <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md transition'>
          <div className='pb-[15px]'>
            <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold'>{t("cart.paymentInfo")}</span>
          </div>
          <div className='flex gap-[15px]' onClick={() => setPaymentMethod("cash")}>
            <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
              <Image
                src={`/assets/money${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                layout='fill'
                objectFit='contain'
              />
            </div>
            <div className='flex flex-1 items-center justify-between cursor-pointer'>
              <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold md:text-[16px]'>{t("cart.cash")}</h3>
              <div className='relative w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                <Image src='/assets/button_active.png' alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </div>
        </div>

        <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full' />

        {/* Vouchers */}
        <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md transition'>
          <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold mb-3'>{t("cart.promos")}</span>
          {selectedVouchers.length > 0 ? (
            <div className='flex flex-col gap-2 mb-4'>
              {selectedVouchers.map((voucher) => (
                <div
                  key={voucher._id}
                  className='flex items-center justify-between p-3 rounded-lg border border-[#fc6011] bg-[#fff5f0] dark:bg-orange-900/20'
                >
                  <span className='text-[#4A4B4D] dark:text-gray-100 font-medium'>{voucher.code}</span>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{voucher.description}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-400 dark:text-gray-500 mb-3'>{t("cart.noVoucher")}</p>
          )}
          <Link href={`/store/${storeId}/vouchers`} className='flex gap-[15px] items-center'>
            <div className='relative w-[30px] pt-[30px]'>
              <Image src='/assets/marketing.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <div className='flex flex-1 items-center justify-between'>
              <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px]'>{t("cart.useVoucher")}</span>
              <div className='relative w-[20px] pt-[20px]'>
                <Image src={`/assets/arrow_right${theme === "dark" ? "_white" : ""}.png`} alt='' layout='fill' objectFit='contain' />
              </div>
            </div>
          </Link>
        </div>

        <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full' />

        {/* Order summary */}
        <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md transition'>
          <OrderSummary
            detailItems={detailCart.data.items}
            subtotalPrice={subtotalPrice}
            shippingFee={shippingFee}
            totalDiscount={totalDiscount}
          />
        </div>

        <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full' />

        <div className='bg-white dark:bg-gray-800 p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md transition'>
          <span className='text-[#4A4B4D] dark:text-gray-400 text-[16px]'>
            {t("cart.termsText")}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-[15px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition-colors duration-300'>
        <div className='flex items-center justify-between pb-[8px] lg:w-[60%] md:w-[80%] md:mx-auto'>
          <span className='text-gray-800 dark:text-gray-100 text-[18px]'>{t("cart.total")}</span>
          <span className='text-[#4A4B4D] dark:text-gray-200 text-[24px] font-semibold'>
            {Number((subtotalPrice - totalDiscount + shippingFee).toFixed(0)).toLocaleString("vi-VN")}đ
          </span>
        </div>
        <div
          onClick={handleCompleteCart}
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-white px-[20px] py-[10px] lg:w-[60%] md:w-[80%] md:mx-auto cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'
        >
          <span className='text-white text-[20px] font-semibold md:text-[18px]'>{t("cart.placeOrder")}</span>
        </div>
      </div>
    </div>
  );
};

export default page;
