import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useReOrderMutation } from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useCancelOrderMutation } from "../../redux/features/order/orderApi";

const OrderItem = ({ history, order }) => {
  const [reOrder, { isSuccess: reOrderSuccess }] = useReOrderMutation();
  const [cancelOrder, { isSuccess: cancelOrderSuccess, error: cancelOrderError }] = useCancelOrderMutation();

  const handleReOrder = async () => {
    await reOrder({ storeId: order.store._id, items: order.items });
  };

  useEffect(() => {
    if (reOrderSuccess) {
      toast.success("Đặt lại thành công");
    }
  }, [reOrderSuccess]);

  const handleCancelOrder = async () => {
    await cancelOrder(order._id);
  };

  useEffect(() => {
    if (cancelOrderSuccess) {
      toast.success("Hủy đơn thành công");
    }
    if (cancelOrderError) {
      toast.error("Hủy đơn hàng thất bại. Đơn hàng đã được chuẩn bị hoặc đã bị hủy trước đó bạn không thể hủy đơn");
    }
  }, [cancelOrderSuccess, cancelOrderError]);

  // SweetAlert2 confirmation for reordering
  const confirmReOrder = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn đặt lại không?",
      text: "Khi đặt lại giỏ hàng hiện tại của bạn sẽ bị thay thế.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đặt lại",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      handleReOrder();
    }
  };

  // SweetAlert2 confirmation for canceling order
  const confirmCancelOrder = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đơn hàng?",
      text: "Đơn hàng sẽ không thể khôi phục sau khi hủy.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      handleCancelOrder();
    }
  };

  return (
    <div className='flex flex-col overflow-hidden border border-[#a3a3a3a3] border-solid rounded-[8px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
      <Link
        href={`/restaurant/${order.store._id}`}
        className='flex gap-[15px] h-fit md:flex-col p-[10px] md:p-0 md:gap-[10px]'
      >
        <div className='relative flex flex-col gap-[4px] w-[70px] pt-[70px] md:w-full md:pt-[45%] md:rounded-[8px] rounded-full overflow-hidden'>
          <Image src={order.store.avatar.url} alt='' layout='fill' objectFit='cover' />
        </div>

        <div className='flex flex-col md:px-[10px] md:pb-[10px] max-w-[calc(100%-85px)] md:max-w-full'>
          <span className='text-[#4A4B4D] text-[20px] font-bold line-clamp-1'>{order.store.name}</span>
          <div className='flex items-center gap-[6px]'>
            <span className='text-[#a4a5a8] whitespace-nowrap'>{order.items.length} món</span>
            <div className='w-[4px] h-[4px] rounded-full bg-[#a4a5a8]'></div>
            <span className='text-[#a4a5a8] line-clamp-1 w-[80%]'>{order.shipLocation.address}</span>
          </div>
        </div>
      </Link>

      {history ? (
        <div className='flex items-center' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <div
            onClick={confirmReOrder} // Use SweetAlert2 confirmation for reordering
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-bl-md cursor-pointer'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đặt lại</span>
          </div>
          <Link
            href={`/restaurant/${order.store._id}/rating/add-rating/${order._id}`}
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-br-md cursor-pointer'
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Đánh giá</span>
          </Link>
        </div>
      ) : (
        <div className='flex items-center' style={{ borderTop: "1px solid #e0e0e0a3" }}>
          <div
            onClick={confirmCancelOrder} // Use SweetAlert2 confirmation for canceling order
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-bl-md cursor-pointer'
            style={{ borderRight: "1px solid #e0e0e0a3" }}
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Hủy đơn hàng</span>
          </div>
          <Link
            href={`/orders/order/${order._id}`}
            className='flex-1 flex justify-center p-[10px] hover:bg-[#e0e0e0a3] rounded-br-md cursor-pointer'
          >
            <span className='text-[#4A4B4D] text-[18px] font-semibold md:text-[16px]'>Xem tiến trình</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
