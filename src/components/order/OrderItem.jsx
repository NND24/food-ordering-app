"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useReOrderMutation } from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useCancelOrderMutation, useGetUserOrderQuery } from "../../redux/features/order/orderApi";
import { useTranslation } from "../../hooks/useTranslation";

const OrderItem = ({ history, order }) => {
  const { t } = useTranslation();
  const [reOrder, { isSuccess: reOrderSuccess, error: reOrderError }] = useReOrderMutation();
  const [cancelOrder, { isSuccess: cancelOrderSuccess, error: cancelOrderError }] = useCancelOrderMutation();

  const { refetch: refetchUserOrder } = useGetUserOrderQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (reOrderSuccess) toast.success(t("order.reorderSuccess"));
    if (reOrderError) toast.error(t("order.reorderFail"));
  }, [reOrderSuccess, reOrderError]);

  useEffect(() => {
    if (cancelOrderSuccess) {
      toast.success(t("order.cancelSuccess"));
      refetchUserOrder();
    }
    if (cancelOrderError) {
      toast.error(t("order.cancelFail"));
    }
  }, [cancelOrderSuccess, cancelOrderError]);

  const confirmReOrder = async () => {
    const result = await Swal.fire({
      title: t("order.reorderConfirmTitle"),
      text: t("order.reorderConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("order.reorderBtn"),
      cancelButtonText: t("common.cancel"),
    });
    if (result.isConfirmed) {
      await reOrder({ storeId: order.store._id, items: order.items });
    }
  };

  const confirmCancelOrder = async () => {
    const result = await Swal.fire({
      title: t("order.cancelConfirmTitle"),
      text: t("order.cancelConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("order.cancelBtn"),
      cancelButtonText: t("common.cancel"),
    });
    if (result.isConfirmed) {
      await cancelOrder(order._id);
    }
  };

  return (
    <div
      className='order-item flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-white dark:bg-gray-800 transition-colors duration-300'
      data-order-id={order._id}
    >
      <Link
        href={`/store/${order.store._id}`}
        className='flex gap-[15px] h-fit md:flex-col p-[10px] md:p-0 md:gap-[10px]'
      >
        <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px] md:w-full md:pt-[45%] md:rounded-[8px] rounded-full overflow-hidden'>
          <Image src={order.store.avatar?.url || ""} alt='' layout='fill' objectFit='cover' />
        </div>

        <div className='flex flex-col md:px-[10px] md:pb-[10px] max-w-[calc(100%-85px)] md:max-w-full'>
          <span className='store-name text-[#4A4B4D] dark:text-gray-100 text-[20px] font-bold line-clamp-1'>
            {order.store.name}
          </span>
          <div className='flex items-center gap-[6px]'>
            <span className='text-[#a4a5a8] dark:text-gray-400 whitespace-nowrap'>{order.items.length} {t("order.items")}</span>
            {order.shipLocation?.address && (
              <>
                <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                <span className='address text-[#a4a5a8] dark:text-gray-400 line-clamp-1 w-[80%]'>
                  {order.shipLocation.address}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>

      {history ? (
        <div className='flex items-center border-t border-gray-200 dark:border-gray-700'>
          <div
            onClick={confirmReOrder}
            className='flex-1 flex justify-center p-[10px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-bl-md cursor-pointer transition-colors'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] dark:text-gray-200 text-[18px] font-semibold md:text-[16px]'>{t("order.reorderBtn")}</span>
          </div>
          <Link
            href={`/store/${order.store._id}/rating/add-rating/${order._id}`}
            className='flex-1 flex justify-center p-[10px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-br-md cursor-pointer transition-colors'
          >
            <span className='text-[#4A4B4D] dark:text-gray-200 text-[18px] font-semibold md:text-[16px]'>{t("order.rate")}</span>
          </Link>
        </div>
      ) : (
        <div className='flex items-center border-t border-gray-200 dark:border-gray-700'>
          <div
            onClick={confirmCancelOrder}
            className='flex-1 flex justify-center p-[10px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-bl-md cursor-pointer transition-colors'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] dark:text-gray-200 text-[18px] font-semibold md:text-[16px]'>
              {t("order.cancelBtn")}
            </span>
          </div>
          <Link
            href={`/orders/detail-order/${order._id}`}
            className='flex-1 flex justify-center p-[10px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-br-md cursor-pointer transition-colors'
          >
            <span className='text-[#4A4B4D] dark:text-gray-200 text-[18px] font-semibold md:text-[16px]'>
              {t("order.viewProgress")}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
