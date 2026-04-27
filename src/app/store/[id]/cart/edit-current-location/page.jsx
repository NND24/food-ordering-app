"use client";
import Link from "next/link";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useStoreLocation } from "../../../../../context/StoreLocationContext";
import { useAddLocationMutation } from "../../../../../redux/features/location/locationApi";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const { id: storeId } = useParams();

  const { storeLocation, setStoreLocation } = useStoreLocation();

  const [name, setName] = useState(storeLocation.name || "");
  const [address, setAddress] = useState(storeLocation.address || "");
  const [contactName, setContactName] = useState(storeLocation.contactName || "");
  const [contactPhonenumber, setContactPhonenumber] = useState(storeLocation.contactPhonenumber || "");
  const [detailAddress, setDetailAddress] = useState(storeLocation.detailAddress || "");
  const [note, setNote] = useState(storeLocation.note || "");

  const [addLocation, { isSuccess }] = useAddLocationMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Thêm địa chỉ thành công");
  }, [isSuccess]);

  const addToLocation = async () => {
    if (!name) {
      toast.error("Vui lòng nhập tên!");
      return;
    }
    await addLocation({
      name,
      address,
      lat: storeLocation.lat,
      lon: storeLocation.lon,
      detailAddress,
      note,
      contactName,
      contactPhonenumber,
      type: "familiar",
    });
  };

  const inputClass =
    "relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-300 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700";
  const labelClass = "flex absolute top-[10px] left-[10px]";

  return (
    <div className='pt-[85px] pb-[90px] md:pt-[75px] md:mt-[20px] md:px-0 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>
      <Heading title='Chỉnh sửa địa điểm' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-200 dark:md:border-gray-700 md:border-solid md:rounded-[10px] md:shadow-md md:overflow-hidden md:p-[20px] transition-colors duration-300'>
        {/* Mobile header */}
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-white dark:bg-gray-800 h-[85px] px-[10px] md:static border-b border-gray-200 dark:border-gray-700 transition-colors duration-300'>
          <Link href={`/store/${storeId}/cart`} className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[24px] font-bold'>Chỉnh sửa địa điểm</h3>
        </div>

        <form>
          <div className={inputClass}>
            <div className={labelClass}>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Tên</span>
            </div>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100'
            />
          </div>

          <div className={inputClass}>
            <div className='flex-1 line-clamp-1'>
              <div className={labelClass}>
                <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
                <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Địa chỉ</span>
              </div>
              <input
                type='text'
                readOnly
                value={address}
                className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100'
              />
            </div>
          </div>

          <div className={inputClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Địa chỉ chi tiết</span>
            </div>
            <input
              type='text'
              onChange={(e) => setDetailAddress(e.target.value)}
              value={detailAddress}
              placeholder='Vd: tên toà nhà / địa điểm gần đó'
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100 placeholder:text-gray-400'
            />
          </div>

          <div className={inputClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Ghi chú cho tài xế</span>
            </div>
            <input
              type='text'
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder='Chỉ dẫn chi tiết địa điểm cho tài xế'
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100 placeholder:text-gray-400'
            />
          </div>

          <div className={inputClass}>
            <div className={labelClass}>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Tên người nhận</span>
            </div>
            <input
              type='text'
              onChange={(e) => setContactName(e.target.value)}
              value={contactName}
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100'
            />
          </div>

          <div className={inputClass}>
            <div className={labelClass}>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-[#000] dark:text-gray-300'>Số điện thoại liên lạc</span>
            </div>
            <input
              type='text'
              onChange={(e) => setContactPhonenumber(e.target.value)}
              value={contactPhonenumber}
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:text-gray-100'
            />
          </div>

          <div className='flex items-center justify-between gap-[10px] p-[20px]'>
            <div className='flex flex-col'>
              <span className='text-[18px] text-[#4a4b4d] dark:text-gray-100 font-bold'>Thêm vào Địa điểm đã lưu</span>
              <span className='text-[15px] text-[#a4a5a8] dark:text-gray-400'>
                Lưu nơi này cho các đơn đặt hàng cho tương lai
              </span>
            </div>
            <div
              className='relative w-[25px] pt-[25px] cursor-pointer shadow-md hover:shadow-lg'
              onClick={addToLocation}
            >
              <Image
                src={`/assets/favorite${isSuccess ? "-active" : ""}.png`}
                alt=''
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        </form>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 px-[10px] py-[15px] z-[100] flex items-center gap-[10px] border-t border-gray-200 dark:border-gray-700 transition-colors duration-300'>
        <button
          onClick={() => {
            setStoreLocation({
              address,
              contactName,
              contactPhonenumber,
              detailAddress,
              name,
              note,
              lat: storeLocation.lat,
              lon: storeLocation.lon,
            });
            router.push(`/store/${storeId}/cart`);
          }}
          className='flex items-center justify-center lg:w-[60%] md:w-[80%] md:mx-auto rounded-[8px] bg-gradient-to-r from-[#fc6011] to-[#ff8533] text-white py-[15px] px-[10px] w-full shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200'
        >
          <span className='text-white text-[20px] font-semibold'>Lưu</span>
        </button>
      </div>
    </div>
  );
};

export default page;
