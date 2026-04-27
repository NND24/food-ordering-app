"use client";
import Link from "next/link";
import Header from "../../../../../../components/header/Header";
import Heading from "../../../../../../components/Heading";
import React, { useEffect } from "react";
import Image from "next/image";
import { useLocation } from "../../../../../../context/LocationContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import {
  useGetLocationQuery,
  useGetUserLocationsQuery,
  useUpdateLocationMutation,
} from "../../../../../../redux/features/location/locationApi";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const fieldClass =
  "relative flex items-center bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 w-full px-[10px] pt-[30px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700 transition-colors";

const labelClass = "flex absolute top-[10px] left-[10px]";

const inputClass =
  "bg-transparent text-[18px] md:text-[14px] w-full text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none";

const page = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { location, setLocation } = useLocation();
  const { type, id } = useParams();

  const [updateLocation, { isSuccess, isError }] = useUpdateLocationMutation();
  const { refetch: refetchUserLocation } = useGetUserLocationsQuery();
  const { data: locationData, refetch: refetchLocation } = useGetLocationQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (locationData && location.lat === 200) {
      setLocation({
        address: locationData.address,
        lat: locationData.location?.coordinates?.[1],
        lon: locationData.location?.coordinates?.[0],
      });
    }
  }, [locationData, location.lat]);

  useEffect(() => {
    if (location.lat !== 200) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        address: location.address,
        lat: location.lat,
        lon: location.lon,
      }));
    }
  }, [location]);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên!"),
    address: yup.string().required("Vui lòng chọn địa chỉ!"),
    lat: yup.number().notOneOf([200], "Vui lòng chọn địa chỉ!").required(),
    lon: yup.number().notOneOf([200], "Vui lòng chọn địa chỉ!").required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: type === "home" ? "Nhà" : type === "company" ? "Công ty" : locationData?.name || "",
      address: locationData?.address || "",
      lat: locationData?.location?.coordinates?.[1] || 200,
      lon: locationData?.location?.coordinates?.[0] || 200,
      detailAddress: locationData?.detailAddress || "",
      note: locationData?.note || "",
      contactName: locationData?.contactName || "",
      contactPhonenumber: locationData?.contactPhonenumber || "",
      type: type,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await updateLocation({
        id,
        data: { ...values, location: { type: "Point", coordinates: [values.lon, values.lat] } },
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Cập nhật địa chỉ thành công!");
      refetchUserLocation();
      refetchLocation();
      router.push("/account/location");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Cập nhật địa chỉ thất bại!");
    }
  }, [isError]);

  return (
    <div className='pt-[85px] pb-[90px] md:pt-[75px] md:mt-[20px] md:px-0 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>
      <Heading title='Chỉnh sửa địa điểm' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-300 dark:md:border-gray-700 md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px] transition-colors duration-300'>
        {/* Fixed mobile header */}
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-white dark:bg-gray-900 h-[85px] px-[10px] md:static border-b-[6px] border-gray-100 dark:border-gray-700 transition-colors duration-300'>
          <Link href='/account/location' className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image
              src={`/assets/arrow_left_long${theme === "dark" ? "_white" : ""}.png`}
              alt=''
              layout='fill'
              objectFit='contain'
            />
          </Link>
          <h3 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Chỉnh sửa địa điểm</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className={fieldClass}>
            <div className={labelClass}>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Tên</span>
            </div>
            <input
              type='text'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              placeholder=''
              readOnly={type === "home" || type === "company"}
              className={inputClass}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.name}</div>
          )}

          {/* Address */}
          <Link
            href='/account/location/choose-location'
            className={`${fieldClass} justify-between cursor-pointer`}
          >
            <div className='flex-1 line-clamp-1'>
              <div className={labelClass}>
                <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
                <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Địa chỉ</span>
              </div>
              <input
                type='text'
                name='address'
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                placeholder=''
                readOnly
                className={`${inputClass} cursor-pointer`}
              />
            </div>
            <div className='relative w-[20px] pt-[20px]'>
              <Image
                src={`/assets/arrow_right${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Link>
          {formik.touched.address && formik.errors.address && (
            <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.address}</div>
          )}

          {/* Detail Address */}
          <div className={fieldClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Địa chỉ chi tiết</span>
            </div>
            <input
              type='text'
              name='detailAddress'
              value={formik.values.detailAddress}
              onChange={formik.handleChange("detailAddress")}
              onBlur={formik.handleBlur("detailAddress")}
              placeholder='Vd: tên toà nhà / địa điểm gần đó'
              className={inputClass}
            />
          </div>

          {/* Note */}
          <div className={fieldClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Ghi chú cho tài xế</span>
            </div>
            <input
              type='text'
              name='note'
              value={formik.values.note}
              onChange={formik.handleChange("note")}
              onBlur={formik.handleBlur("note")}
              placeholder='Chỉ dẫn chi tiết địa điểm cho tài xế'
              className={inputClass}
            />
          </div>

          {/* Contact Name */}
          <div className={fieldClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Tên người liên lạc</span>
            </div>
            <input
              type='text'
              name='contactName'
              value={formik.values.contactName}
              onChange={formik.handleChange("contactName")}
              onBlur={formik.handleBlur("contactName")}
              placeholder=''
              className={inputClass}
            />
          </div>

          {/* Contact Phone */}
          <div className={fieldClass}>
            <div className={labelClass}>
              <span className='text-[14px] md:text-[12px] text-gray-600 dark:text-gray-400'>Số điện thoại liên lạc</span>
            </div>
            <input
              type='text'
              name='contactPhonenumber'
              value={formik.values.contactPhonenumber}
              onChange={formik.handleChange("contactPhonenumber")}
              onBlur={formik.handleBlur("contactPhonenumber")}
              placeholder=''
              className={inputClass}
            />
          </div>

          {/* Submit button */}
          <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-[10px] py-[15px] z-[100] transition-colors duration-300'>
            <button
              type='submit'
              className='flex items-center justify-center lg:w-[60%] md:w-[80%] md:mx-auto rounded-[8px] text-white py-[15px] px-[10px] w-full shadow-md hover:shadow-lg bg-[#fc6011] cursor-pointer transition'
            >
              <span className='text-white text-[20px] font-semibold'>Lưu địa chỉ này</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
