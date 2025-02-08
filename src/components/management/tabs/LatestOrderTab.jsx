'use client';
import React from "react";
import { useRouter } from "next/navigation";

const OrderCard = ({ order }) => {
  const router = useRouter();
  return (
    <div className="border rounded-lg shadow-md p-4 bg-[#FCF5F4] mb-4">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="bg-[#fc6011] text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-md">
            {order.id}
          </div>
          <div className="ml-2 text-sm text-gray-700">
            <p className="font-medium text-gray-800">{order.user}</p>
            <p>{order.TotalFood} Món / {order.TotalMoney} </p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-3">
        <ul className="text-sm text-gray-700 mb-3">
          {order.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Text Section */}
        <p className="font-thin text-sm text-gray-400 flex-shrink-0">
          Lấy đơn trong {order.takenTime} phút
        </p>

        {/* Buttons Section */}
        <div className="flex space-x-4">
          <button
            className="py-1 px-2 bg-gray-200 text-sm text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => router.push(`orders/${order.id}`)}
          >
            Xem thêm
          </button>
          <button className="py-1 px-2 bg-[#fc6011] text-sm text-white rounded-md hover:bg-[#e9550f]">
            Xác nhận
          </button>
        </div>
      </div>

    </div>
  );
};

const LatestOrder = () => {

  const orders = [
    {
      user: "Anh",
      id: "02",
      TotalFood: 2,
      TotalMoney: "75,000₫",
      details: [
        // "2 Món - 75,000₫",
        "1x Trà Cây Thập Cẩm",
        "1x Đùi gà rán",
      ],
      orderTime: "12:12",
      takenTime: 24
    },
    {
      user: 'Anh',
      id: "03",
      TotalFood: 2,
      TotalMoney: "80,000₫",
      details: [
        // "2 Món - 80,000₫",
        "1x Bánh Tráng Phơi Sương Hành Phi",
        "1x Đùi gà rán",
      ],
      orderTime: "12:12",
      takenTime: 27
    },
  ];

  return (
    <div className="w-full px-4 py-2">
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-transparency flex flex-col"
        >
          <OrderCard order={order} />
        </div>
      ))}
      <div className="flex items-center justify-center w-full h-full mt-10">
        <span>Không còn đơn hàng nào khác</span>
      </div>
    </div>
  );
};

export default LatestOrder;