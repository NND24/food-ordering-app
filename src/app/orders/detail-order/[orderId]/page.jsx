"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import OrderSummary from "../../../../components/order/OrderSummary";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useSocket } from "../../../../context/SocketContext";
import { useTheme } from "next-themes";
import {
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/order/orderApi";
import { useReOrderMutation } from "../../../../redux/features/cart/cartApi";
import { useCreateStoreChatMutation } from "../../../../redux/features/chat/chatApi";
import { useTranslation } from "../../../../hooks/useTranslation";

const statusKeys = {
  cancelled: "order.statusCancelledText",
  pending: "order.statusPendingText",
  confirmed: "order.statusConfirmedText",
  preparing: "order.statusPreparingText",
  finished: "order.statusFinishedText",
  taken: "order.statusTakenText",
  delivering: "order.statusDeliveringText",
  delivered: "order.statusDeliveredText",
  done: "order.statusDoneText",
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  const { orderId } = useParams();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.user);
  const { sendNotification, notifications } = useSocket();

  const {
    data: orderDetailData,
    isLoading,
    refetch,
  } = useGetOrderDetailQuery(orderId, { skip: !orderId });
  const orderDetail = orderDetailData?.data || null;

  const [cancelOrder] = useCancelOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [reOrder] = useReOrderMutation();
  const [createStoreChat, { isLoading: isCreatingChat }] = useCreateStoreChatMutation();

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success(t("payment.success"));
      const url = new URL(window.location.href);
      url.searchParams.delete("status");
      window.history.replaceState({}, "", url);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (notifications) {
      const newOrderNotification = notifications.find((n) => n.orderId === orderId);
      if (newOrderNotification) refetch();
    }
  }, [notifications]);

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
      try {
        await cancelOrder(orderId).unwrap();
        sendNotification({
          storeId: orderDetail.storeId,
          title: "Đơn hàng đã bị hủy",
          message: `Đơn hàng (#${orderId}) đã bị hủy bởi khách hàng.`,
          orderId: orderId,
          type: "order",
        });
        toast.success(t("order.cancelSuccess"));
        router.push("/orders");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
      try {
        await reOrder(orderId).unwrap();
        toast.success(t("order.reorderSuccess"));
        router.push(`/store/${orderDetail.storeId}/cart/`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const confirmTakeOrder = async () => {
    const result = await Swal.fire({
      title: t("order.confirmTitle"),
      text: t("order.confirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.confirm"),
      cancelButtonText: t("common.cancel"),
    });

    if (result.isConfirmed) {
      try {
        await updateOrderStatus({ orderId, data: { status: "done" } }).unwrap();
        sendNotification({
          storeId: orderDetail.storeId,
          title: "Đơn hàng đã hoàn tất",
          message: `Đơn hàng (#${orderId}) đã được khách hàng xác nhận.`,
          orderId: orderId,
          type: "order_done",
        });
        toast.success(t("order.confirmSuccess"));
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChatWithStore = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      const result = await createStoreChat({ userId, storeId: orderDetail.storeId }).unwrap();
      const chatId =
        typeof result === "string"
          ? result
          : result?.data?._id || result?._id || result?.data || "";
      if (chatId) {
        router.push(`/message/${chatId}`);
        return;
      }
      toast.error(t("message.notFound"));
    } catch {
      toast.error(t("message.openError"));
    }
  };

  if (isLoading || !orderDetail) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900'>
        <Atom color='#fc6011' size='medium' text='' textColor='' />
      </div>
    );
  }

  return (
    <div className='pb-36 bg-white dark:bg-gray-900 dark:text-gray-100 md:pt-28'>
      <Heading title='Chi tiết đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      {orderDetail?.userId === currentUser?._id ? (
        <div className='lg:w-[60%] md:w-[80%] md:mx-auto'>
          {/* Mobile Header */}
          <div className='flex items-center gap-5 px-5 pt-5 md:hidden'>
            <Image
              src={`/assets/arrow_left_long${theme === "dark" ? "_white" : ""}.png`}
              alt=''
              width={40}
              height={40}
              className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition'
              onClick={() => router.back()}
            />
            <h3 className='text-[#333] dark:text-gray-100 text-2xl font-bold'>{t("order.detail")}</h3>
          </div>

          {/* Order Card */}
          <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6 hover:shadow-lg transition'>
            {/* Store Info + Cancel */}
            <div className='flex justify-between gap-3 items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex gap-3 items-center'>
                <Link
                  href={`/store/${orderDetail?.store._id}`}
                  className='relative w-[70px] h-[70px] overflow-hidden rounded-lg shadow hover:scale-105 transition-transform'
                >
                  <Image
                    src={orderDetail?.store.avatar.url || ""}
                    alt={orderDetail?.store.name || ""}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </Link>
                <Link href={`/store/${orderDetail?.store._id}`} className='flex flex-col flex-1 gap-1 group'>
                  <span className='text-[#333] dark:text-gray-100 text-xl font-bold line-clamp-1 group-hover:text-[#fc6011] transition-colors'>
                    {orderDetail?.store.name}
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 text-sm line-clamp-1'>
                    {orderDetail?.store.description}
                  </span>
                </Link>
              </div>
              <div className='hidden sm:flex items-center gap-2'>
                <button
                  onClick={handleChatWithStore}
                  disabled={isCreatingChat}
                  className='flex items-center gap-2 px-4 py-2 rounded-full border border-[#fc6011] text-[#fc6011] font-semibold bg-[#fff4ef] shadow-sm hover:shadow-md hover:bg-[#ffe8dd] transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Image src='/assets/message.png' alt='' width={16} height={16} />
                  {t("nav.message")}
                </button>
                {orderDetail?.status === "pending" && (
                  <button
                    className='flex items-center gap-2 px-4 py-2 text-nowrap rounded-full bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white font-semibold shadow-md hover:shadow-xl transition hover:scale-105'
                    onClick={confirmCancelOrder}
                  >
                    {t("order.cancelBtn")}
                  </button>
                )}
                {orderDetail?.status === "delivering" && (
                  <button
                    className='flex items-center gap-2 px-4 py-2 text-nowrap rounded-full bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white font-semibold shadow-md hover:shadow-xl transition hover:scale-105'
                    onClick={confirmTakeOrder}
                  >
                    {t("order.confirmBtn")}
                  </button>
                )}
              </div>
            </div>

            <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full'></div>

            {/* Status */}
            <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6'>
              <span className='text-[#333] dark:text-gray-100 text-lg font-medium block mb-2'>{t(statusKeys[orderDetail?.status] || "")}</span>
              {orderDetail?.status !== "cancelled" && (
                <div className='relative flex items-center justify-between py-4'>
                  <Image src='/assets/start_active.png' alt='' width={25} height={25} />
                  <div
                    className={`absolute top-[50%] left-[9%] h-[4px] w-[20%] rounded-full ${
                      !["preorder"].includes(orderDetail?.status) ? "bg-[#fc6011]" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <Image
                    src={`/assets/cooking${
                      ["confirmed", "preparing", "finished", "taken", "delivering", "delivered", "done"].includes(
                        orderDetail?.status
                      )
                        ? "_active"
                        : `${theme === "dark" ? "_white" : ""}`
                    }.png`}
                    alt=''
                    width={25}
                    height={25}
                  />
                  <div
                    className={`absolute top-[50%] left-[40%] h-[4px] w-[20%] rounded-full ${
                      ["preparing", "finished", "taken", "delivering", "delivered", "done"].includes(orderDetail?.status)
                        ? "bg-[#fc6011]"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <Image
                    src={`/assets/delivery${
                      ["taken", "delivering", "delivered", "done"].includes(orderDetail?.status)
                        ? "_active"
                        : `${theme === "dark" ? "_white" : ""}`
                    }.png`}
                    alt=''
                    width={25}
                    height={25}
                  />
                  <div
                    className={`absolute top-[50%] right-[10%] h-[4px] w-[20%] rounded-full ${
                      ["delivering", "delivered", "done"].includes(orderDetail?.status)
                        ? "bg-[#fc6011]"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <Image
                    src={`/assets/home${
                      ["done", "delivered"].includes(orderDetail?.status)
                        ? "_active"
                        : `${theme === "dark" ? "_white" : ""}`
                    }.png`}
                    alt=''
                    width={25}
                    height={25}
                  />
                </div>
              )}
            </div>

            <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full'></div>

            {/* Delivery Info */}
            <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6'>
              <p className='text-[#333] dark:text-gray-100 text-lg font-bold pb-4'>{t("order.deliverTo")}</p>
              {[
                {
                  icon: `/assets/account${theme === "dark" ? "_white" : ""}.png`,
                  value: orderDetail?.shipInfo?.contactName,
                },
                {
                  icon: `/assets/phone${theme === "dark" ? "_white" : ""}.png`,
                  value: orderDetail?.shipInfo?.contactPhonenumber,
                },
                {
                  icon: `/assets/location${theme === "dark" ? "_white" : ""}.png`,
                  value: orderDetail?.shipInfo?.address,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='relative flex items-center bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden mb-3'
                >
                  <Image
                    src={item.icon}
                    alt=''
                    width={20}
                    height={20}
                    className='absolute left-3 top-1/2 transform -translate-y-1/2'
                  />
                  <input
                    type='text'
                    readOnly
                    value={item.value || ""}
                    className='bg-gray-50 dark:bg-gray-700 text-base py-2 pr-3 pl-9 w-full text-gray-700 dark:text-gray-200'
                  />
                </div>
              ))}
            </div>

            <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full'></div>

            {/* Payment Info */}
            <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6 space-y-4'>
              <span className='text-[#333] dark:text-gray-100 text-lg font-bold'>{t("order.paymentInfo")}</span>
              <div className='flex gap-4'>
                <div className='relative w-7 pt-7'>
                  <Image
                    src={`/assets/money${theme === "dark" ? "_white" : ""}.png`}
                    alt=''
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <div className='flex flex-1 items-center justify-between'>
                  <h3 className='text-[#333] dark:text-gray-100 text-lg font-bold'>{t("order.cash")}</h3>
                  <div className='relative w-7 pt-7'>
                    <Image
                      src={
                        orderDetail?.paymentMethod !== "vnpay" || orderDetail?.paymentStatus !== "paid"
                          ? "/assets/button_active.png"
                          : `/assets/button${theme === "dark" ? "_white" : ""}.png`
                      }
                      alt=''
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full'></div>

            {/* Vouchers */}
            <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6'>
              <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold'>{t("cart.promos")}</span>
              {orderDetail.vouchers?.length > 0 ? (
                <div className='mt-3 flex flex-col gap-2'>
                  {orderDetail.vouchers.map((voucher) => (
                    <div
                      key={voucher._id}
                      className='flex items-center justify-between p-3 rounded-lg border border-[#fc6011] bg-[#fff5f0]'
                    >
                      <span className='text-[#4A4B4D] font-medium'>{voucher.voucherId?.code}</span>
                      <span className='text-sm text-gray-500'>{voucher.voucherId?.description}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='mt-3 text-sm text-gray-400'>{t("cart.noVoucher")}</p>
              )}
            </div>

            <div className='h-[6px] w-full bg-gray-100 dark:bg-gray-700 my-4 rounded-full'></div>

            {/* Order Summary */}
            <div className='bg-white dark:bg-gray-800 flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md md:p-6'>
              <OrderSummary
                detailItems={orderDetail?.items}
                subtotalPrice={orderDetail?.subtotalPrice}
                shippingFee={orderDetail?.shippingFee}
                totalDiscount={orderDetail?.totalDiscount}
              />
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex flex-col sm:flex-row sm:justify-end gap-3'>
              <button
                onClick={handleChatWithStore}
                disabled={isCreatingChat}
                className='sm:hidden flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg border border-[#fc6011] text-[#fc6011] font-semibold bg-[#fff4ef] shadow-sm hover:bg-[#ffe8dd] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Image src='/assets/message.png' alt='' width={18} height={18} className='flex-shrink-0' />
                {isCreatingChat ? t("message.openingChat") : t("message.chatWithStore")}
              </button>
              {orderDetail?.status === "pending" && (
                <div className='block sm:hidden'>
                  <button
                    onClick={confirmCancelOrder}
                    className='w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all'
                  >
                    {t("order.cancelBtn")}
                  </button>
                </div>
              )}
              {orderDetail?.status === "delivering" && (
                <div className='block sm:hidden'>
                  <button
                    className='w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all'
                    onClick={confirmTakeOrder}
                  >
                    {t("order.confirmBtn")}
                  </button>
                </div>
              )}
              {orderDetail?.status === "done" && (
                <div className='flex flex-col sm:flex-row gap-3 w-full'>
                  <Link
                    href={`/store/${orderDetail.storeId}/rating/add-rating/${orderId}`}
                    className='flex items-center justify-center w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#fc6011] to-[#ff8743] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all'
                  >
                    {t("order.rateOrder")}
                  </Link>
                  <button
                    onClick={confirmReOrder}
                    className='w-full px-6 py-3 rounded-lg border border-[#fc6011] text-[#fc6011] font-semibold bg-white dark:bg-gray-800 shadow-md hover:bg-[#fff4ef] hover:scale-105 transition-all'
                  >
                    {t("order.reorderOrder")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='lg:w-[60%] md:w-[80%] md:mx-auto px-5 pt-5'>
          <h3 className='text-xl text-[#4a4b4d] dark:text-gray-100 font-semibold'>
            {t("order.wrongAccount")}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Page;
