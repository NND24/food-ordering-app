"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useCompleteCartMutation } from "../../../../../redux/features/cart/cartApi";
import { toast } from "react-toastify";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [completeCart] = useCompleteCartMutation();

  useEffect(() => {
    const completeOrder = async () => {
      const pendingOrder = localStorage.getItem("pendingOrder");
      if (!pendingOrder) {
        toast.error("Không tìm thấy thông tin đơn hàng.");
        router.replace("/orders");
        return;
      }

      const orderData = JSON.parse(pendingOrder);

      try {
        const result = await completeCart({
          ...orderData,
          paymentMethod: "VNPay",
        }).unwrap();
        toast.success("Thanh toán thành công!");
        localStorage.removeItem("pendingOrder");
        router.replace(`/orders/detail-order/${result.orderId}`);
      } catch (error) {
        console.error("Lỗi completeCart:", error);
        toast.error("Không thể xác nhận đơn hàng.");
        router.replace("/orders");
      }
    };

    completeOrder();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900'>
      <h1 className='text-2xl font-bold text-green-600'>Đang xác nhận đơn hàng...</h1>
    </div>
  );
}
