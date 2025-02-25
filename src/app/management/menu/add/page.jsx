"use client";

import NavBar from "../../../../components/management/NavBar";
import React from "react";
import Header from "../../../../components/management/Header";
import { useState } from "react";
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

            <Header title="Thêm món ăn" goBack={true} />

            <div className="w-full px-5 py-6 mt-12">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto space-y-6">

                {/* Image Upload Section */}
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

                {/* Input Fields Section */}
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
                                className="w-full p-2 outline-none bg-transparent text-gray-800"
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}

                    {/* Category Dropdown */}
                    <div className="border-b pb-2">
                        <label className="block text-sm font-semibold text-gray-700">Danh mục*</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 outline-none bg-transparent text-gray-800"
                        >
                            <option value="">Chọn danh mục</option>
                            <option value="fast_food">Fast Food</option>
                            <option value="drinks">Drinks</option>
                            <option value="dessert">Dessert</option>
                        </select>
                    </div>

                    {/* Selling Time Dropdown */}
                    <div className="border-b pb-2">
                        <label className="block text-sm font-semibold text-gray-700">Thời gian bán*</label>
                        <select
                            name="sellingTime"
                            value={formData.sellingTime}
                            onChange={handleChange}
                            className="w-full p-2 outline-none bg-transparent text-gray-800"
                        >
                            <option value="Cả ngày">Cả ngày</option>
                            <option value="Sáng">Sáng</option>
                            <option value="Trưa">Trưa</option>
                            <option value="Tối">Tối</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Save Button - Fixed at Bottom */}
            <div className="fixed bottom-4 left-4 right-4">
                <button
                    onClick={handleSave}
                    className="w-full text-white py-3 text-lg font-semibold rounded-lg bg-[#fc6011] shadow-md hover:bg-[#e1550e] transition"
                >
                    Lưu
                </button>
            </div>
        </div>
            <NavBar page='orders' />
        </>
    );
};

export default page;