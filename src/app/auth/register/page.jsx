"use client";
import Header from "../../../components/header/Header";
import Heading from "../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "../../../redux/features/auth/authApi";

const page = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);

  const [registerUser, { isSuccess, error }] = useRegisterUserMutation();

  const handleRegisterSuccess = async () => {
    toast.success("Đăng ký thành công!");
    await router.push("/auth/login");
  };

  useEffect(() => {
    if (isSuccess) {
      handleRegisterSuccess();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên!"),
    email: yup.string().email("Email không hợp lệ!").required("Vui lòng nhập Email!"),
    phonenumber: yup.string().required("Vui lòng nhập số điện thoại!"),
    gender: yup.string().required("Vui lòng chọn giới tính!"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!").required("Vui lòng nhập mật khẩu!"),
    confirmPassword: yup
      .string()
      .min(6, "Nhập lại mật khẩu phải có ít nhất 6 ký tự!")
      .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không khớp!")
      .required("Vui lòng nhập lại mật khẩu!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await registerUser(values);
      formik.resetForm();
    },
  });

  return (
    <div className='md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Đăng ký' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
        <div className='flex flex-col items-center py-[30px] h-screen md:h-full'>
          <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Đăng ký</h3>
          <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

          <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
            <div className='w-[80%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#e8e9e9] text-[#636464] rounded-full gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#7a7a7a]"
                }`}
              >
                <Image
                  src='/assets/account.png'
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] left-[25px] translate-y-[-50%]'
                />
                <input
                  type='text'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder='Nhập tên'
                  className='bg-[#e8e9e9] text-[18px] py-[20px] pr-[20px] pl-[60px] w-full'
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.name}</div>
              ) : null}
            </div>

            <div className='w-[80%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#e8e9e9] text-[#636464] rounded-full gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#7a7a7a]"
                }`}
              >
                <Image
                  src='/assets/email.png'
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] left-[25px] translate-y-[-50%]'
                />
                <input
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder='Nhập email của bạn'
                  className='bg-[#e8e9e9] text-[18px] py-[20px] pr-[20px] pl-[60px] w-full'
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className='w-[80%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#e8e9e9] text-[#636464] rounded-full gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#7a7a7a]"
                }`}
              >
                <Image
                  src='/assets/phone.png'
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] left-[25px] translate-y-[-50%]'
                />
                <input
                  type='text'
                  name='phonenumber'
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange("phonenumber")}
                  onBlur={formik.handleBlur("phonenumber")}
                  placeholder='Nhập số điện thoại'
                  className='bg-[#e8e9e9] text-[18px] py-[20px] pr-[20px] pl-[60px] w-full'
                />
              </div>
              {formik.touched.phonenumber && formik.errors.phonenumber ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.phonenumber}</div>
              ) : null}
            </div>

            <div className='w-[80%] my-[10px] flex gap-[2px] flex-col justify-between'>
              <div className='flex gap-[10px] flex-row'>
                <label
                  className={`flex items-center justify-between flex-1 p-[12px] rounded-[6px] border border-solid text-subColor ${
                    formik.touched.gender && formik.errors.gender !== undefined ? "border-red-500" : "border-[#7a7a7a]"
                  }`}
                  htmlFor='female'
                >
                  Nữ
                  <input
                    type='radio'
                    name='gender'
                    id='female'
                    value='female'
                    onChange={formik.handleChange("gender")}
                    onBlur={formik.handleBlur("gender")}
                  />
                </label>

                <label
                  className={`flex items-center justify-between flex-1 p-[12px] rounded-[6px] border border-solid border-borderColor text-subColor ${
                    formik.touched.gender && formik.errors.gender !== undefined ? "border-red-500" : "border-[#7a7a7a]"
                  }`}
                  htmlFor='male'
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                >
                  Nam
                  <input type='radio' name='gender' id='male' value='male' />
                </label>

                <label
                  className={`flex items-center justify-between flex-1 p-[12px] rounded-[6px] border border-solid border-borderColor text-subColor ${
                    formik.touched.gender && formik.errors.gender !== undefined ? "border-red-500" : "border-[#7a7a7a]"
                  }`}
                  htmlFor='other'
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                >
                  Khác
                  <input type='radio' name='gender' id='other' value='other' />
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.gender}</div>
              ) : null}
            </div>

            <div className='w-[80%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#e8e9e9] text-[#636464] rounded-full gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#7a7a7a]"
                }`}
              >
                <Image
                  src='/assets/lock.png'
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] left-[25px] translate-y-[-50%]'
                />
                <input
                  type={showPass ? "text" : "password"}
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder='Nhập mật khẩu của bạn'
                  className='bg-[#e8e9e9] text-[18px] py-[20px] pr-[20px] pl-[60px] w-full'
                />
                {showPass ? (
                  <Image
                    src='/assets/eye_show.png'
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <Image
                    src='/assets/eye_hide.png'
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className='w-[80%] my-[10px]'>
              <div
                className={`relative flex items-center bg-[#e8e9e9] text-[#636464] rounded-full gap-[8px] border border-solid overflow-hidden ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#7a7a7a]"
                }`}
              >
                <Image
                  src='/assets/lock.png'
                  alt=''
                  width={25}
                  height={25}
                  className='absolute top-[50%] left-[25px] translate-y-[-50%]'
                />
                <input
                  type={showPass ? "text" : "password"}
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                  placeholder='Nhập lại mật khẩu'
                  className='bg-[#e8e9e9] text-[18px] py-[20px] pr-[20px] pl-[60px] w-full'
                />
                {showPass ? (
                  <Image
                    src='/assets/eye_show.png'
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <Image
                    src='/assets/eye_hide.png'
                    alt=''
                    width={25}
                    height={25}
                    className='absolute top-[50%] right-[25px] translate-y-[-50%]'
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <button
              type='submit'
              className={`text-center text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] ${
                formik.isValid && formik.dirty ? "bg-[#fc6011] cursor-pointer" : "bg-[#f5854d] cursor-not-allowed"
              }`}
              disabled={!formik.isValid || !formik.dirty}
            >
              Đăng ký
            </button>
          </form>

          <p className='text-[#636464] font-semibold my-[10px]'>
            Đã có tài khoản{" "}
            <Link href='/auth/login' className='text-[#fc6011] cursor-pointer'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
