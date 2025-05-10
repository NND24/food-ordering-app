"use client";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import OrderSummary from "../../../../components/order/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCreateChatMutation, useGetAllChatsQuery } from "../../../../redux/features/chat/chatApi";
import { useParams, useRouter } from "next/navigation";
import { useGetOrderDetailQuery } from "../../../../redux/features/order/orderApi";

const page = () => {
  const router = useRouter();
  const { orderId } = useParams();

  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");

  const [createChat] = useCreateChatMutation();

  const { refetch: refetchAllChats } = useGetAllChatsQuery();

  const { data: orderDetail, refetch: refetchGetOrderDetail } = useGetOrderDetailQuery(orderId);

  useEffect(() => {
    refetchGetOrderDetail();
  }, []);

  const calculatePrice = () => {
    const { totalPrice, totalQuantity } = orderDetail.data.items.reduce(
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

    setPrice(totalPrice);
  };

  useEffect(() => {
    console.log(orderDetail);
    if (orderDetail) {
      calculatePrice();

      if (orderDetail.data.status === "cancelled") {
        setStatus("Đơn hàng đã bị hủy");
      } else if (orderDetail.data.status === "pending") {
        setStatus("Đơn hàng đang chờ quán xác nhận");
      } else if (orderDetail.data.status === "confirmed") {
        setStatus("Quán đã xác nhận đơn hàng");
      } else if (orderDetail.data.status === "preparing") {
        setStatus("Quán đang chuẩn bị món ăn");
      } else if (orderDetail.data.status === "finished") {
        setStatus("Món ăn đã hoàn thành");
      } else if (orderDetail.data.status === "taken") {
        setStatus("Shipper đã lấy món ăn");
      } else if (orderDetail.data.status === "delivering") {
        setStatus("Shipper đang vận chuyển đến chỗ bạn");
      } else if (orderDetail.data.status === "delivered") {
        setStatus("Đơn hàng đã được giao tới nơi");
      } else if (orderDetail.data.status === "done") {
        setStatus("Đơn hàng được giao hoàn tất");
      } else {
        setStatus("");
      }
    }
  }, [orderDetail]);

  const handleChat = async (id, storeId) => {
    try {
      const result = await createChat({ id, body: { storeId } }).unwrap();

      if (result) {
        router.push(`/message/${result}`);
        refetchAllChats();
      }
    } catch (error) {
      console.error("Lỗi khi tạo chat:", error);
    }
  };

  return (
    <div className='pb-[140px] bg-[#fff] md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Chi tiết đơn hàng' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='lg:w-[60%] md:w-[80%] md:mx-auto'>
        <div className='flex items-center gap-[20px] px-[20px] pt-[20px] md:hidden'>
          <Image
            src='/assets/arrow_left_long.png'
            alt=''
            width={40}
            height={40}
            className='p-[8px] rounded-full bg-[#e0e0e0a3]'
            onClick={() => router.back()}
          />
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Chi tiết đơn hàng</h3>
        </div>

        {orderDetail && (
          <div className='bg-[#fff] flex flex-col m-[20px] p-[10px] border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:p-[20px]'>
            <div className='flex justify-between'>
              <div className='flex gap-[15px]'>
                <Link
                  href={`/restaurant/${orderDetail.data.store._id}`}
                  className='relative flex flex-col gap-[4px] w-[70px] pt-[70px]'
                >
                  <Image
                    src={orderDetail.data.store.avatar.url || ""}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                    className='rounded-[6px]'
                  />
                </Link>

                <Link href={`/restaurant/${orderDetail.data.store._id}`} className='flex flex-col'>
                  <div className='flex items-center gap-[6px] cursor-pointer'>
                    <span className='text-[#4A4B4D] text-[20px] font-bold line-clamp-1'>
                      {orderDetail.data.store.name}
                    </span>
                  </div>
                  <div className='flex items-center gap-[6px]'>
                    <span className='text-[#a4a5a8] line-clamp-1'>{orderDetail.data.store.description}</span>
                  </div>
                </Link>
              </div>

              <div
                onClick={() => {
                  handleChat(`${orderDetail.data.store.owner}`, orderDetail.data.store._id);
                }}
                className='flex gap-[4px] p-[10px] h-fit rounded-[6px] cursor-pointer hover:bg-[#e0e0e0a3]'
              >
                <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                  <Image src='/assets/send.png' alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
            </div>

            <div className='h-[6px] w-full bg-[#e0e0e0a3] my-[15px]'></div>

            <div className='bg-[#fff]'>
              {orderDetail.data.status !== "cancelled" && <h3 className='text-[#4A4B4D] text-[28px] font-bold'></h3>}
              <span className='text-[#4A4B4D] text-[18px]'>{status}</span>

              {orderDetail.data.status !== "cancelled" && (
                <div className='relative flex items-center justify-between py-[10px]'>
                  <Image src={`/assets/start_active.png`} alt='' width={25} height={25} />

                  <div
                    className={`absolute top-[45%] left-[9%] h-[4px] w-[20%] rounded-[4px] ${
                      !["preorder"].includes(orderDetail.data.status) ? "bg-[#fc6011]" : "bg-[#a4a5a8]"
                    }`}
                  ></div>

                  <Image
                    src={`/assets/cooking${
                      ["confirmed", "preparing", "finished", "taken", "delivering", "delivered", "done"].includes(
                        orderDetail.data.status
                      )
                        ? "_active"
                        : ""
                    }.png`}
                    alt=''
                    width={25}
                    height={25}
                  />

                  <div
                    className={`absolute top-[45%] left-[40%] h-[4px] w-[20%] rounded-[4px] ${
                      ["preparing", "finished", "taken", "delivering", "delivered", "done"].includes(
                        orderDetail.data.status
                      )
                        ? "bg-[#fc6011]"
                        : "bg-[#a4a5a8]"
                    }`}
                  ></div>

                  <Image
                    src={`/assets/delivery${
                      ["taken", "delivering", "delivered", "done"].includes(orderDetail.data.status) ? "_active" : ""
                    }.png`}
                    alt=''
                    width={25}
                    height={25}
                  />

                  <div
                    className={`absolute top-[45%] right-[10%] h-[4px] w-[20%] rounded-[4px] ${
                      ["delivering", "delivered", "done"].includes(orderDetail.data.status)
                        ? "bg-[#fc6011]"
                        : "bg-[#a4a5a8]"
                    }`}
                  ></div>

                  <Image
                    src={`/assets/home${["done", "delivered"].includes(orderDetail.data.status) ? "_active" : ""}.png`}
                    alt=''
                    width={25}
                    height={25}
                  />
                </div>
              )}
            </div>

            {orderDetail.data.shipper && (
              <>
                <div className='h-[6px] w-full bg-[#e0e0e0a3] my-[15px]'></div>

                <div className='bg-[#fff] flex flex-col gap-[15px]'>
                  <div className='flex gap-[15px]'>
                    <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px]'>
                      <Image
                        src={orderDetail.data.shipper.avatar.url}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                        className='rounded-full'
                      />
                    </div>

                    <div className='flex flex-col  flex-1'>
                      <div className='flex items-center gap-[6px]'>
                        <span className='text-[#4A4B4D] text-[20px] font-bold'>{orderDetail.data.shipper.name}</span>
                      </div>
                      {orderDetail.data?.shipper?.vehicle && (
                        <div className='flex items-center gap-[6px]'>
                          <span className='text-[#a4a5a8]'>{orderDetail.data?.shipper?.vehicle?.name}</span>
                          <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
                          <span className='text-[#a4a5a8]'>{orderDetail.data?.shipper?.vehicle?.number}</span>
                        </div>
                      )}
                    </div>

                    <div
                      onClick={() => {
                        handleChat(`${orderDetail.data.shipper._id}`, null);
                      }}
                      className='flex gap-[4px] p-[10px] h-fit rounded-[6px] cursor-pointer hover:bg-[#e0e0e0a3]'
                    >
                      <div className='relative flex flex-col gap-[4px] w-[30px] pt-[30px] md:w-[20px] md:pt-[20px]'>
                        <Image src='/assets/send.png' alt='' layout='fill' objectFit='contain' />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className='h-[6px] w-full bg-[#e0e0e0a3] my-[15px]'></div>

            <div className=''>
              <p className='text-[#4A4B4D] text-[18px] font-bold pb-[20px]'>Giao tới</p>

              <div
                className={`relative flex items-center bg-[#f5f5f5] text-[#636464] rounded-[15px] gap-[8px] border border-solid border-[#7a7a7a] overflow-hidden mb-[10px]`}
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
                  name='customerName'
                  readOnly
                  value={orderDetail.data.customerName}
                  className='bg-[#f5f5f5] text-[18px] py-[10px] pr-[10px] pl-[35px] w-full'
                />
              </div>

              <div
                className={`relative flex items-center bg-[#f5f5f5] text-[#636464] rounded-[15px] gap-[8px] border border-solid border-[#7a7a7a] overflow-hidden mb-[10px]`}
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
                  name='customerPhonenumber'
                  readOnly
                  value={orderDetail.data.customerPhonenumber}
                  className='bg-[#f5f5f5] text-[18px] py-[10px] pr-[10px] pl-[35px] w-full'
                />
              </div>

              <div
                className={`relative flex items-center bg-[#f5f5f5] text-[#636464] rounded-[15px] gap-[8px] border border-solid border-[#7a7a7a] overflow-hidden`}
              >
                <Image
                  src='/assets/location.png'
                  alt=''
                  width={20}
                  height={20}
                  className='absolute top-[50%] left-[10px] translate-y-[-50%]'
                />
                <input
                  type='text'
                  name='deliveryAddress'
                  readOnly
                  value={orderDetail.data.shipLocation.address}
                  className='bg-[#f5f5f5] text-[18px] py-[10px] pr-[10px] pl-[35px] w-full'
                />
              </div>
            </div>

            <div className='h-[6px] w-full bg-[#e0e0e0a3] my-[15px]'></div>

            <div className=''>
              <div className='pb-[20px] flex items-center justify-between'>
                <span className='text-[#4A4B4D] text-[18px] font-bold'>Thông tin thanh toán</span>
              </div>

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

            <div className='h-[6px] w-full bg-[#e0e0e0a3] my-[15px]'></div>

            <OrderSummary detailItems={orderDetail.data.items} price={price} />
          </div>
        )}
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-[#fff] p-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        <Link
          href={`/orders/order/${orderId}/track-order-location`}
          className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] md:py-[10px] lg:w-[60%] md:w-[80%] md:mx-auto'
        >
          <span className='text-[#fff] text-[20px] font-semibold md:text-[18px]'>Theo dõi vị trí đơn hàng</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
