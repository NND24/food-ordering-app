"use client";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import { useGetVouchersByStoreQuery } from "../../../../redux/features/voucher/voucherApi";
import { useGetDetailCartQuery } from "../../../../redux/features/cart/cartApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { Atom } from "react-loading-indicators";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useVoucher } from "../../../../context/VoucherContext";

const Page = () => {
  const { id: storeId } = useParams();
  const router = useRouter();

  const { userCart } = useSelector((state) => state.cart);
  const { storeVouchers, toggleVoucher } = useVoucher();

  const selectedVouchers = storeVouchers[storeId] || [];

  const storeCart = useMemo(() => {
    if (!userCart) return null;
    return userCart.find((c) => c.storeId === storeId || c.store?._id === storeId) || null;
  }, [userCart, storeId]);

  const { data: vouchersData, isLoading } = useGetVouchersByStoreQuery(storeId, {
    skip: !storeId,
  });

  const { data: detailCartData } = useGetDetailCartQuery(storeCart?._id, {
    skip: !storeCart?._id,
  });

  const storeVouchersList = vouchersData?.data || [];
  const detailCart = detailCartData?.data || null;

  const cartPrice = useMemo(() => {
    if (!detailCart?.items) return 0;
    return detailCart.items.reduce((acc, item) => {
      const dishPrice = (item.dish?.price || 0) * item.quantity;
      const toppingsPrice =
        (Array.isArray(item.toppings)
          ? item.toppings.reduce((sum, topping) => sum + (topping.price || 0), 0)
          : 0) * item.quantity;
      return acc + dishPrice + toppingsPrice;
    }, 0);
  }, [detailCart]);

  const handleToggleVoucher = (voucher) => {
    const isSelected = selectedVouchers.some((v) => v._id === voucher._id);
    const hasNonStackable = selectedVouchers.some((v) => !v.isStackable);

    if (!voucher.isStackable && selectedVouchers.length > 0 && !isSelected) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Voucher này không thể dùng chung với voucher khác",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    if (hasNonStackable && !isSelected) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Bạn đã chọn voucher không thể dùng chung",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    toggleVoucher(storeId, voucher);
  };

  const isVoucherValid = (voucher) => {
    const now = new Date();
    if (!voucher.isActive) return false;
    if (voucher.startDate && new Date(voucher.startDate) > now) return false;
    if (voucher.endDate && new Date(voucher.endDate) < now) return false;
    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) return false;
    if (voucher.minOrderAmount && cartPrice && cartPrice < voucher.minOrderAmount) return false;
    return true;
  };

  return (
    <div className='min-h-screen py-[85px] bg-white dark:bg-gray-900 md:pt-[110px] transition-colors duration-300'>
      <Heading title='Phiếu giảm giá' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      {/* Mobile Header */}
      <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-5 bg-white dark:bg-gray-800 h-[85px] px-5 shadow-md md:hidden border-b border-gray-200 dark:border-gray-700 transition-colors'>
        <Image
          src='/assets/arrow_left_long.png'
          alt='Back'
          width={30}
          height={30}
          className='cursor-pointer hover:scale-105 transition'
          onClick={() => router.back()}
        />
        <h3 className='text-[#4A4B4D] dark:text-gray-100 text-xl font-bold'>Ưu đãi</h3>
      </div>

      {!isLoading ? (
        <>
          <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-200 dark:md:border-gray-700 md:rounded-2xl md:shadow-md transition-colors'>
            <div className='px-5 py-4'>
              {storeVouchersList.length > 0 ? (
                storeVouchersList.map((voucher) => {
                  const valid = isVoucherValid(voucher);
                  const isSelected = selectedVouchers.some((v) => v._id === voucher._id);

                  return (
                    <div
                      key={voucher._id}
                      onClick={() => valid && handleToggleVoucher(voucher)}
                      className={`flex gap-4 items-start p-4 mb-3 border rounded-xl shadow-sm transition
                      ${
                        valid
                          ? isSelected
                            ? "border-[#fc6011] bg-[#fff5f0] dark:bg-orange-900/20 dark:border-[#fc6011] cursor-pointer hover:shadow-md"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer hover:shadow-md hover:scale-[1.01]"
                          : "opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      }`}
                    >
                      <div className='flex justify-between flex-1 items-center'>
                        <div className='flex flex-col'>
                          <h4 className='text-[#4A4B4D] dark:text-gray-100 text-lg font-semibold line-clamp-1'>
                            {voucher.code}
                          </h4>
                          <p className='text-gray-500 dark:text-gray-400 text-sm'>{voucher.description}</p>
                          {voucher.minOrderAmount > 0 && (
                            <p className='text-xs text-gray-400 dark:text-gray-500'>
                              Đơn tối thiểu: {Number(voucher.minOrderAmount).toLocaleString("vi-VN")}đ
                            </p>
                          )}
                        </div>
                        {valid && (
                          <div className='relative w-[26px] h-[26px] flex-shrink-0'>
                            <Image
                              src={`/assets/${isSelected ? "button_active" : "button"}.png`}
                              alt=''
                              fill
                              className='object-contain'
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='flex flex-col items-center text-center py-10'>
                  <h3 className='text-[#4A4B4D] dark:text-gray-100 text-2xl font-bold mt-4'>
                    Quán hiện không có ưu đãi nào
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 flex items-center justify-between p-5 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-colors'>
            <h4 className='text-[#4A4B4D] dark:text-gray-100 text-lg font-semibold'>
              Đã chọn {selectedVouchers.length} ưu đãi
            </h4>
            <div
              onClick={() => router.push(`/store/${storeId}/cart`)}
              className={`flex items-center justify-center rounded-lg px-6 py-3 shadow-md transition-all duration-300
              ${
                selectedVouchers.length > 0
                  ? "bg-[#fc6011] text-white hover:bg-[#e0560f] hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className='text-[18px] font-semibold'>Áp dụng</span>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-screen flex items-center justify-center'>
          <Atom color='#fc6011' size='medium' text='' textColor='' />
        </div>
      )}
    </div>
  );
};

export default Page;
