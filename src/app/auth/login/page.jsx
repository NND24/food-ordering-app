"use client";
import Header from "../../../components/header/Header";
import Heading from "../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useLoginUserMutation, useLoginWithGoogleMutation } from "../../../redux/features/auth/authApi";

const page = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);

  const [loginUser, { isSuccess: loginSuccess, error: loginError }] = useLoginUserMutation();
  const [loginWithGoogle, { isSuccess: loginWithGoogleSuccess, error: loginWithGoogleError }] =
    useLoginWithGoogleMutation();

  const handleLoginSuccess = async () => {
    toast.success("Đăng nhập thành công!");
    await router.push("/home");
  };

  useEffect(() => {
    if (loginSuccess) {
      handleLoginSuccess();
    }

    if (loginError) {
      if ("data" in loginError) {
        const errorData = loginError;
        toast.error(errorData.data.message);
      }
    }
  }, [loginSuccess, loginError]);

  useEffect(() => {
    if (loginWithGoogleSuccess) {
      handleLoginSuccess();
    }

    if (loginWithGoogleError) {
      if ("data" in loginWithGoogleError) {
        const errorData = loginWithGoogleError;
        toast.error(errorData.data.message);
      }
    }
  }, [loginWithGoogleSuccess, loginWithGoogleError]);

  const schema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ!").required("Vui lòng nhập Email!"),
    password: yup.string().required("Vui lòng nhập mật khẩu!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await loginUser(values);
      formik.resetForm();
    },
  });

  return (
    <div className='md:bg-[#f9f9f9] md:pt-[110px]'>
      <Heading title='Đăng nhập' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
        <div className='flex flex-col items-center justify-between py-[50px] h-screen md:h-full'>
          <div className='flex flex-col items-center w-full'>
            <h3 className='text-[#4A4B4D] text-[30px] font-bold pb-[20px]'>Đăng nhập</h3>
            <Image src='/assets/app_logo.png' alt='' height={150} width={150} className='mb-[10px]' />

            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
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
                    formik.touched.password && formik.errors.password ? "border-red-500" : "border-[#7a7a7a]"
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
                      className='absolute top-[50%] right-[25px] translate-y-[-50%] cursor-pointer'
                      onClick={() => setShowPass(!showPass)}
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-red-500 text-sm mt-[5px] ml-[20px]'>{formik.errors.password}</div>
                ) : null}
              </div>

              <button
                type='submit'
                className={`text-center text-[#fff] font-semibold w-[80%] p-[20px] rounded-full my-[10px] ${
                  formik.isValid && formik.dirty ? "bg-[#fc6011] cursor-pointer" : "bg-[#f5854d] cursor-not-allowed"
                }`}
                disabled={!formik.isValid || !formik.dirty}
              >
                Đăng nhập
              </button>
            </form>

            <Link href='/auth/forgot-password' className='text-[#636464] font-semibold my-[10px] cursor-pointer'>
              Quên mật khẩu?
            </Link>

            <div className='relative bg-[#636464] h-[1px] w-[80%] mb-[20px] mt-[30px]'>
              <span className='absolute right-[45%] top-[-10px] text-[#636464] font-medium bg-[#fff]'>Hoặc</span>
            </div>

            <div className='relative flex items-center justify-center bg-[#347EC0] text-[#fff] w-[80%] h-[55px] p-[20px] rounded-full my-[10px] gap-[10px] cursor-pointer'>
              <Image
                src='/assets/facebook_logo.png'
                alt=''
                width={10}
                height={10}
                className='absolute left-[20px] top-[50%] translate-y-[-50%]'
              />
              <button className='text-[18px]'>Đăng nhập bằng Facebook</button>
            </div>

            <div className='login-google__button w-[80%] rounded-full my-[10px] overflow-hidden cursor-pointer'>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const token = credentialResponse.credential;
                    loginWithGoogle({ token });
                  }}
                  onError={() => {
                    console.error("Login Failed");
                  }}
                  shape='pill'
                  width='100%'
                />
              </GoogleOAuthProvider>
            </div>
          </div>

          <p className='text-[#636464] font-semibold mt-[20px]'>
            Chưa có mật khẩu?{" "}
            <Link href='/auth/register' className='text-[#fc6011] cursor-pointer'>
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
