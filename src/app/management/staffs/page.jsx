'use client'
import NavBar from "../../../components/management/NavBar";
import Image from "next/image";
import React, { useState } from "react";
import Header from "../../../components/management/Header";
import { useRouter } from "next/navigation";

const Page = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [storeName, setStoreName] = useState("Cửa hàng A - Quán cơm...");
    const [address, setAddress] = useState("Điện Biên, Xã Nậm Kè");
    const [openTime, setOpenTime] = useState("08:00");
    const [closeTime, setCloseTime] = useState("22:00");
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter()

    const staffList = [
        { id: 1, name: "Lương Bảo Nhi", role: "Quản lý", status: "Hoạt động" },
        { id: 2, name: "Mai Ngọc Chung", role: "Nhân viên", status: "Hoạt động" },
        { id: 3, name: "Mai Xuân Thắng", role: "Nhân viên", status: "Hoạt động" },
        { id: 4, name: "Nguyễn Hải Triều", role: "Quản lý", status: "Hoạt động" },
        { id: 5, name: "Nguyễn Hoàng Hạnh Trúc", role: "Nhân viên", status: "Hoạt động" },
    ];

    return (
        <>
            <Header title="Quản lý nhân viên" />
            <div className="pt-[30px] pb-[100px] px-[20px] mt-12">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <input
                        type="text"
                        placeholder="Tìm nhân viên qua tên/vị trí"
                        className="w-full p-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <ul>
                        {staffList.filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase())).map((staff, index) => (
                            <li key={index} className="flex justify-between items-center py-2 ring-1 ring-gray-100 p-3" onClick={() => { router.push(`staffs/${staff.id}/detail`) }}>
                                <div>
                                    <p className="font-semibold">{staff.name}</p>
                                    <p className="text-gray-500 text-sm">{staff.role}</p>
                                </div>
                                <span className="text-green-500 ring ring-green-500/50 px-2 py-1 rounded-sm text-sm">{staff.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex w-full place-content-end">
                    <button className="w-full md:w-auto p-4 bg-orange-500 text-white rounded-lg font-semibold shadow-md hover:bg-orange-600" onClick={()=>{router.push(`staffs/add`)}}>
                        + Thêm nhân viên
                    </button>
                </div>
            </div>

            <NavBar page="" />
        </>
    );
};

export default Page;
