import NavBar from "../../../components/management/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../../../components/management/Header";
import ExpandSetting from "../../../components/management/ExpandSetting"
const Page = () => {
  return (
    <>
      <Header title="Cài đặt" goBack={true}/>
      <div className="pt-[30px] pb-[100px] px-[20px] mt-12">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between border border-orange-500">
          <div className="flex items-center space-x-3">
            <Image src="/assets/shop_logo.png" alt="Partner" width={62} height={62} />
            <div>
              <h2 className="text-lg font-semibold">Cửa hàng A - Quán cơm...</h2>
              <p className="text-gray-500 text-sm">Điện Biên, Xã Nậm Kè</p>
            </div>
          </div>
          <Link href="/change-store" className="text-orange-500 font-semibold">
            Thay đổi
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <ExpandSetting></ExpandSetting>
        </div>
      </div>
      <NavBar page="home" />
    </>
  );
};

export default Page;
