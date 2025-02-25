"use client";
import Link from "next/link";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocation } from "../../../../../context/LocationContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useAddLocationMutation, useGetUserLocationsQuery } from "../../../../../redux/features/location/locationApi";

const page = () => {
  const router = useRouter();
  const { location } = useLocation();
  const { type } = useParams();

  const [addLocation, { isSuccess }] = useAddLocationMutation();
  const { refetch: refetchUserLocation } = useGetUserLocationsQuery();

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên!"),
    address: yup.string().required("Vui lòng chọn địa chỉ!"),
    lat: yup.number().notOneOf([200], "Vui lòng chọn địa chỉ!").required("Vui lòng chọn địa chỉ!"),
    lon: yup.number().notOneOf([200], "Vui lòng chọn địa chỉ!").required("Vui lòng chọn địa chỉ!"),
  });

  const formik = useFormik({
    initialValues: {
      name: type === "home" ? "Nhà" : type === "company" ? "Công ty" : "",
      address: location.address || "",
      lat: location.lat,
      lon: location.lon,
      detailAddress: "",
      note: "",
      contactName: "",
      contactPhonenumber: "",
      type: type,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await addLocation(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/account/location");
      refetchUserLocation();
    }
  }, [addLocation, isSuccess]);

  return (
    <div className='pt-[85px] pb-[90px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Thêm vào địa điểm' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div
          className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-[#fff] h-[85px] px-[20px] md:static'
          style={{ borderBottom: "6px solid #e0e0e0a3" }}
        >
          <Link href='/account/location' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Thêm vào địa điểm</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[10px] left-[20px]'>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Tên</span>
            </div>
            <input
              type='text'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              placeholder=''
              readOnly={type === "home" || type === "company"}
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.name}</div>
          ) : null}

          <Link
            href={`/account/location/choose-location`}
            className='relative flex items-center justify-between gap-[10px] bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] cursor-pointer'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex-1 line-clamp-1'>
              <div className='flex absolute top-[10px] left-[20px]'>
                <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
                <span className='text-[14px] md:text-[12px] text-[#000]'>Địa chỉ</span>
              </div>
              <input
                type='text'
                name='address'
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                placeholder=''
                readOnly
                className='bg-[#fff] text-[18px] md:text-[14px] w-full cursor-pointer'
              />
            </div>
            <div className='relative w-[20px] pt-[20px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </Link>
          {formik.touched.address && formik.errors.address ? (
            <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.address}</div>
          ) : null}

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[10px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Địa chỉ chi tiết</span>
            </div>
            <input
              type='text'
              name='detailAddress'
              value={formik.values.detailAddress}
              onChange={formik.handleChange("detailAddress")}
              onBlur={formik.handleBlur("detailAddress")}
              placeholder='Vd: tên toàn nhà / địa điểm gần đó'
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[10px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Ghi chú cho tài xế</span>
            </div>
            <input
              type='text'
              name='note'
              value={formik.values.note}
              onChange={formik.handleChange("note")}
              onBlur={formik.handleBlur("note")}
              placeholder='Chỉ dẫn chi tiết địa điểm cho tài xế'
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[10px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Tên người liên lạc</span>
            </div>
            <input
              type='text'
              name='contactName'
              value={formik.values.contactName}
              onChange={formik.handleChange("contactName")}
              onBlur={formik.handleBlur("contactName")}
              placeholder=''
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div
            className='relative flex items-center bg-[#fff] text-[#636464] w-full px-[20px] pt-[30px] pb-[12px] gap-[8px]'
            style={{ borderBottom: "1px solid #e0e0e0a3" }}
          >
            <div className='flex absolute top-[10px] left-[20px]'>
              <span className='text-[14px] md:text-[12px] text-[#000]'>Số điện thoại liên lạc</span>
            </div>
            <input
              type='text'
              name='contactPhonenumber'
              value={formik.values.contactPhonenumber}
              onChange={formik.handleChange("contactPhonenumber")}
              onBlur={formik.handleBlur("contactPhonenumber")}
              placeholder=''
              className='bg-[#fff] text-[18px] md:text-[14px] w-full'
            />
          </div>

          <div className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100]'>
            <button
              type='submit'
              className={`flex items-center justify-center rounded-[8px] text-[#fff] py-[15px] px-[20px] w-full ${
                formik.isValid && formik.dirty ? "bg-[#fc6011] cursor-pointer" : "bg-[#f5854d] cursor-not-allowed"
              }`}
            >
              <span className='text-[#fff] text-[20px] font-semibold'>Lưu địa chỉ này</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
