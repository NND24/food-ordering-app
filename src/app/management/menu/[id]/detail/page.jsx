"use client";

import NavBar from "../../../../../components/management/NavBar";
import React, { useState } from "react";
import Header from "../../../../../components/management/Header";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        sellingTime: "Cả ngày",
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        console.log("Saving data:", formData);
        // Add API call or local save logic here
    };

    return (
        <>
            <Header title="Chi tiết món ăn" goBack={true} />

            <div className="w-full px-5 py-6 mt-12 md:mb-0 mb-24">
                <div className="flex-1 overflow-auto space-y-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700">Hình ảnh</label>
                        <p className="text-xs text-gray-500">Món có ảnh sẽ được khách đặt nhiều hơn. Tỷ lệ ảnh yêu cầu: 1:1.</p>
                        <div className="relative mt-3 w-24 h-24 rounded-md border flex items-center justify-center bg-gray-100">
                            {image ? (
                                <img src={image} alt="Uploaded" className="w-full h-full rounded-md object-cover" />
                            ) : (
                                <span className="text-gray-400">Chưa có ảnh</span>
                            )}
                            <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            <button
                                onClick={() => document.getElementById("imageUpload").click()}
                                className="absolute top-1 right-1 bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-gray-900 transition"
                            >
                                Sửa
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
                        {[
                            { label: "Tên*", name: "name", type: "text", placeholder: "VD: Khoai tây chiên" },
                            { label: "Giá*", name: "price", type: "number", placeholder: "Nhập giá" },
                            { label: "Mô tả", name: "description", type: "text", placeholder: "VD: Cà chua + Khoai tây chiên + Tương ớt" },
                        ].map((field, index) => (
                            <div key={index} className="border-b pb-2">
                                <label className="block text-sm font-semibold text-gray-700">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full p-2 ring-1 ring-gray-300 my-2 rounded-md outline-none focus:border-[#fc6011] focus:ring-1 focus:ring-[#fc6011] text-gray-800"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}

                        <div className="border-b pb-2">
                            <label className="block text-sm font-semibold text-gray-700">Danh mục*</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 ring-1 ring-gray-300 my-2 rounded-md outline-none focus:border-[#fc6011] focus:ring-1 focus:ring-[#fc6011] text-gray-800"
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="fast_food">Fast Food</option>
                                <option value="drinks">Drinks</option>
                                <option value="dessert">Dessert</option>
                            </select>
                        </div>

                        <div className="border-b pb-2">
                            <label className="block text-sm font-semibold text-gray-700">Thời gian bán*</label>
                            <select
                                name="sellingTime"
                                value={formData.sellingTime}
                                onChange={handleChange}
                                className="w-full p-2 ring-1 ring-gray-300 my-2 rounded-md outline-none focus:border-[#fc6011] focus:ring-1 focus:ring-[#fc6011] text-gray-800"
                            >
                                <option value="Cả ngày">Cả ngày</option>
                                <option value="Sáng">Sáng</option>
                                <option value="Trưa">Trưa</option>
                                <option value="Tối">Tối</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between bg-white p-3 rounded-md">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="font-medium">Còn món/sản phẩm</p>
                                </div>
                            </div>

                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button
                            onClick={handleSave}
                            className="flex-1 text-white py-3 text-md font-semibold rounded-lg bg-[#fc6011] shadow-md hover:bg-[#e1550e] transition"
                        >
                            Lưu
                        </button>
                        <button
                            className="flex-1 text-white py-3 text-md font-semibold rounded-lg bg-gray-500 shadow-md hover:bg-gray-600 transition"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            <NavBar page='orders' />
        </>
    );
};

export default page;
