'use client'
import NavBar from "../../../components/management/NavBar";
import Image from "next/image";
import React, { useState } from "react";
import Header from "../../../components/management/Header";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("Cửa hàng A - Quán cơm...");
  const [address, setAddress] = useState("Điện Biên, Xã Nậm Kè");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");

  return (
    <>
      <Header title="Thông tin cửa hàng"/>
      <div className="pt-[30px] pb-[100px] px-[20px] mt-12">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/assets/shop_logo.png" alt="Partner" width={52} height={52} />
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ) : (
                  <h2 className="text-lg font-semibold cursor-pointer hover:text-orange-500" onClick={() => setIsEditing(true)}>{storeName}</h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border p-2 rounded w-full mt-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ) : (
                  <p className="text-gray-500 text-sm cursor-pointer hover:text-orange-500" onClick={() => setIsEditing(true)}>{address}</p>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-green-500 font-semibold px-4 py-1 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-red-500 font-semibold px-4 py-1 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange-500 font-semibold px-4 py-1 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
              >
                Thay đổi
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Thời gian mở cửa</label>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Thời gian đóng cửa</label>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      <NavBar page="" />
    </>
  );
};

export default Page;

