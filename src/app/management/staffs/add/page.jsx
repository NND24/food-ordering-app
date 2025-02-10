"use client";
import NavBar from "../../../../components/management/NavBar";
import Header from "../../../../components/management/Header";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
  const [staff, setStaff] = useState({
    fullName: " ",
    loginMethod: "phone",
    phone: " ",
    email: "",
    role: "Nhân viên",
  });

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    loginMethod: false,
    phoneEmail: false,
    role: false,
  });

  const handleChange = (field, value) => {
    setStaff((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <Header title="Thêm Nhân Viên" goBack={true} />
      <div className="pt-8 pb-24 px-5 space-y-6 mt-12">
        {/* 🔹 Full Name */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Họ và tên</p>
          <div className="flex items-center space-x-2">
            {isEditing.fullName ? (
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={staff.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            ) : (
              <p className="text-lg font-semibold flex-1">{staff.fullName}</p>
            )}
            <button onClick={() => toggleEdit("fullName")}>
              <Image src={"/assets/editing.png"} alt="Edit" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Login Method */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Phương thức đăng nhập</p>
          <div className="flex items-center space-x-2">
            {isEditing.loginMethod ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={staff.loginMethod}
                onChange={(e) => handleChange("loginMethod", e.target.value)}
              >
                <option value="phone">Số điện thoại</option>
                <option value="email">Email</option>
              </select>
            ) : (
              <p className="text-lg font-semibold flex-1">
                {staff.loginMethod === "phone" ? "Số điện thoại" : "Email"}
              </p>
            )}
            <button onClick={() => toggleEdit("loginMethod")}>
              <Image src={"/assets/editing.png"} alt="Edit" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Phone or Email */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">
            {staff.loginMethod === "phone" ? "Số điện thoại" : "Email"}
          </p>
          <div className="flex items-center space-x-2">
            {isEditing.phoneEmail ? (
              <input
                type={staff.loginMethod === "phone" ? "text" : "email"}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={staff.loginMethod === "phone" ? staff.phone : staff.email}
                onChange={(e) =>
                  handleChange(staff.loginMethod === "phone" ? "phone" : "email", e.target.value)
                }
              />
            ) : (
              <p className="text-lg font-semibold flex-1">
                {staff.loginMethod === "phone" ? staff.phone : staff.email}
              </p>
            )}
            <button onClick={() => toggleEdit("phoneEmail")}>
              <Image src={"/assets/editing.png"} alt="Edit" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Role Selection */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Vai trò</p>
          <div className="flex items-center space-x-2">
            {isEditing.role ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={staff.role}
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="Nhân viên">Nhân viên</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Chủ cửa hàng">Chủ cửa hàng</option>
              </select>
            ) : (
              <p className="text-lg font-semibold flex-1">{staff.role}</p>
            )}
            <button onClick={() => toggleEdit("role")}>
              <Image src={"/assets/editing.png"} alt="Edit" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Save Button */}
        <button className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition">
          Lưu nhân viên
        </button>
      </div>

      <NavBar page="home" />
    </>
  );
};

export default Page;
