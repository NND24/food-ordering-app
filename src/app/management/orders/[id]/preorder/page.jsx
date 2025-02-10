import NavBar from "../../../../../components/management/NavBar";
import React from "react";
import Header from "../../../../../components/management/Header"
const page = () => {
    return (
        <>

            <Header title="Đặt trước" goBack={true} />

            <div className="w-full px-4 py-2 mt-20">
                <div className="w-full p-4 bg-gray-50">
                    {/* <div className="p-2 bg-transparentcy text-sm text-gray-400 rounded-md mb-2">
                        Đơn hàng đã được nhận bởi quán
                    </div> */}
                    {/* Notes Section */}
                    <div className="p-2 bg-yellow-100 text-yellow-800 text-sm rounded-md mb-4">
                        Khách ghi chú: <span className="font-semibold">Cung cấp đúng các dụng cụ ăn</span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {/* Replace with user icon */}
                            </div>
                            <div className="ml-3">
                                <h3 className="text-gray-800 font-medium">Khách đặt đơn</h3>
                                <p className="text-sm text-gray-600">0337950404</p>
                            </div>
                        </div>
                        <button className="py-1 px-3 bg-[#fc6011] text-white rounded-md hover:bg-[#e9550f]">
                            Gọi
                        </button>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {/* Replace with driver icon */}
                        </div>
                        <div className="ml-3">
                            <h3 className="text-gray-800 font-medium">Chưa chỉ định tài xế</h3>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <ul className="mb-4 text-sm text-gray-700">
                            <li className="flex justify-between py-2">
                                <span>1 x  Trà Cây Thập Cẩm</span>
                                <span>30.000₫</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span>1 x   Đùi gà rán</span>
                                <span>45.000₫</span>
                            </li>
                        </ul>

                        {/* Order Summary */}
                        <div className="text-sm">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700 font-bold">Tổng tiền món (giá gốc)</span>
                                <span className="text-gray-800 font-medium">75.000₫</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Chiết khấu (30%)</span>
                                <span className="text-gray-800 font-medium">-22.500₫</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Phí đóng gói</span>
                                <span className="text-gray-800 font-medium">+6.000₫</span>
                            </div>
                            <div className="flex justify-between">
                                <span className=" text-md font-bold">Tổng tiền quán nhận (2 món)</span>
                                <span className="text-md font-bold text-[#fc6011]">58.500₫</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Metadata */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Mã đơn hàng</span>
                            <a href="/" className="text-blue-500 underline">
                                30124-509192124
                            </a>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Thời gian đặt hàng</span>
                            <span className="text-gray-800">Hôm nay 14:08</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Khoảng cách</span>
                            <span className="text-gray-800">2.2km</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Thời gian lấy hàng dự kiến</span>
                            <span className="text-gray-800">Hôm nay 14:38</span>
                        </div>
                    </div>
                    {/* Buttons Section */}
                    <div className="flex w-full space-x-4 justify-between my-4 p-1">
                        <button
                            className="py-2 px-4 bg-gray-200 text-md text-gray-700 rounded-md hover:bg-gray-300 w-full"
                        >
                            Hủy
                        </button>
                        <button className="py-2 px-4 bg-[#fc6011] text-md text-white rounded-md hover:bg-[#e9550f] w-full">
                            Sửa
                        </button>
                    </div>
                </div>
            </div>
            <NavBar page='orders' />
        </>
    );
};

export default page;