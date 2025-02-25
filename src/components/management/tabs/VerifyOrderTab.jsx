'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Dropdown from "../../../components/Dropdown"
const OrderCard = ({ order }) => {
  return (<>
    
    <div className="border rounded-lg shadow-md p-4 bg-white mb-4">
      {/* Order Header */}
      <Link href={`orders/${order.id}/verify`} passHref>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="bg-[#fc6011] text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-md">
            {order.id}
          </div>
          <div className="ml-2 text-sm text-gray-700">
            <span className="font-bold text-[#fc6011] text-lg">#{order.number}</span>
            <p className="text-sm text-gray-400 text-light">Giao lúc {order.deliveryTime} ({order.remainingTime})</p>
          </div>
        </div>
        {/* <span className="text-sm text-gray-600">{order.remainingTime}</span> */}
      </div>

      {/* Order Details */}
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-800">{order.shopName}</p>
        <p className="text-sm text-gray-600">{order.status}</p>
      </div>
      </Link>
      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">{order.items}</div>
        <button className="px-4 py-2 text-white bg-[#fc6011] rounded-md hover:bg-[#e9550f]">
          {order.actionButtonText}
        </button>
      </div>
    </div>
    </>
  );
};


const VerifyOrderTab = () => {
  const orders = [
    {
      id: "02",
      number: "2124",
      deliveryTime: "14:50",
      remainingTime: "trong 39 phút",
      shopName: "Lộc Test",
      status: "Tài xế đang đến.",
      items: "2 món",
      price: "58.500₫",
      actionButtonText: "Thông báo Tài xế",
    },
    {
      id: "03",
      number: "7260",
      deliveryTime: "14:50",
      remainingTime: "trong 39 phút",
      shopName: "Lộc Test",
      status: "ShopeeFood đang tìm tài xế cho đơn này.",
      items: "2 món",
      price: "62.000₫",
      actionButtonText: "Thông báo Tài xế",
    },
  ]
  const options = ["Quán xác nhận", "Xác nhận tự động", "Đang chuẩn bị", "Chờ đến lấy"];
  const handleDropdownChange = (value, id) => {
    console.log("Selected Value:", value);
    console.log("Assigned ID:", id);
  };
  return (

    <div className="w-full px-4 py-2">
      <Dropdown
        options={options}
        onChange={handleDropdownChange}
      />
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
};

export default VerifyOrderTab;