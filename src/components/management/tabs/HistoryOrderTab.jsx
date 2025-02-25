'use client';
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Dropdown from "../../../components/Dropdown";
import DateRangePicker from "../../DateRangePicker";

import { format, isToday, isTomorrow } from "date-fns";
import vi from "date-fns/locale/vi";

const OrderCard = ({ order }) => {
  return (
    <Link href={`orders/${order.id}/history`} passHref>
      <div className="border rounded-lg shadow-md p-4 bg-white mb-4">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="text-sm text-gray-700">
              <Link href={`orders/${order.id}/history`} className="text-gray-700 text-md font-bold">
                {order.user}
              </Link>
              <p className="text-sm text-gray-400 text-light">{order.id}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-3 grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <p className="text-sm font-medium text-gray-400">Lấy đơn</p>
            <p className="text-sm font-medium text-gray-800">
              {/* {format(new Date(order.orderTime || order.orderTime), "HH:mm")} */}
              {order.orderTime || order.orderTime}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-sm font-medium text-gray-400">Món</p>
            <p className="text-sm font-medium text-[#fc6011]">{order.TotalFood}</p>
          </div>
          <div className="col-span-6">
            <p className="text-sm font-medium text-gray-400">Khoảng cách</p>
            <p className="text-sm font-medium text-gray-800">{order.distance} Km</p>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2">
        <div className="flex justify-start items-center">
          <div className="text-sm text-gray-400 font-light">{order.paymentMethod}</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-sm text-[#fc6011] font-bold">{order.TotalMoney}</div>
        </div>
        </div>
        
      </div>
    </Link>
  );
};

const HistoryOrder = () => {
  const orderList = [
    {
      date: new Date().toISOString(), // Current timestamp
      status: "Đã hủy",
      orders: [
        {
          user: "Anh",
          id: "02",
          TotalFood: 2,
          TotalMoney: "75,000₫",
          details: ["1x Trà Cây Thập Cẩm", "1x Đùi gà rán"],
          orderTime: "12:12",
          distance: 2.4,
          paymentMethod: "Hủy bởi MonekyFood"
        },
        {
          user: "Anh",
          id: "03",
          TotalFood: 2,
          TotalMoney: "80,000₫",
          details: ["1x Bánh Tráng Phơi Sương Hành Phi", "1x Đùi gà rán"],
          orderTime: "12:12",
          distance: 2.7,
          paymentMethod: "Hủy bởi MonekyFood"
        },
      ],
    },
    {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow's timestamp
      status: "Đã hủy",
      orders: [
        {
          user: "Anh",
          id: "04",
          TotalFood: 1,
          TotalMoney: "50,000₫",
          details: ["1x Cà Phê Sữa"],
          orderTime: "10:10",
          distance: 1.5,
          paymentMethod: "Hủy bởi MonekyFood"
        },
        {
          user: "Anh",
          id: "05",
          TotalFood: 3,
          TotalMoney: "120,000₫",
          details: ["1x Bánh Mì", "1x Nước Ép Cam", "1x Trà Sữa"],
          orderTime: "14:00",
          distance: 3.0,
          paymentMethod: "Hủy bởi MonekyFood"
        },
      ],
    },
  ];

  // Sort orders by date
  orderList.sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDateRangeChange = ({ start, end }) => {
    console.log("Selected Start Date:", start);
    console.log("Selected End Date:", end);
  };

  // Function to render the date header (Hôm nay, Ngày mai, or specific date)
  const renderDateHeader = (time) => {
    const orderDate = new Date(time);
    if (isToday(orderDate)) {
      return "Hôm nay";
    }
    if (isTomorrow(orderDate)) {
      return "Ngày mai";
    }
    return format(orderDate, "dd/MM/yyyy", { locale: vi });
  };

  const options = ["Quán xác nhận", "Xác nhận tự động", "Đang chuẩn bị", "Chờ đến lấy"];
  const handleDropdownChange = (value, id) => {
    console.log("Selected Value:", value);
    console.log("Assigned ID:", id);
  };

  return (
    <div className="w-full px-4 py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <Dropdown options={options} onChange={handleDropdownChange} />
        </div>
        <div className="col-span-6">
          <DateRangePicker onChange={handleDateRangeChange} />
        </div>
      </div>

      {orderList.map((dateGroup, index) => (
        <div key={index}>
          <div className="mb-2 shadow-md bg-white p-2 rounded-sm grid grid-cols-3">
            <p className="text-sm font-medium text-gray-400 col-span-2 px-2">{renderDateHeader(dateGroup.date)}</p>
            <p className="text-sm font-medium text-gray-800 col-span-1 text-right px-2">{dateGroup.status}</p>
          </div>
          {dateGroup.orders.map((order, idx) => (
            <OrderCard key={idx} order={order} />
          ))}
        </div>
      ))}

      <div className="flex items-center justify-center w-full h-max mt-10 mb-20">
        <span>Không còn đơn hàng nào khác</span>
      </div>
    </div>
  );
};

export default HistoryOrder;
