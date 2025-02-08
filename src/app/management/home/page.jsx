import NavBar from "../../../components/management/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../../../components/management/Header"
import HomeContent from "../../../components/management/HomeContent"
const page = () => {
  return (
    <>

      <Header store = "Tên cửa hàng"/>
      <div className='pt-[30px] pb-[100px] px-[20px]'>
      
      <HomeContent/>

      </div>
      <NavBar page='home' />
    </>
  );
};

export default page;
