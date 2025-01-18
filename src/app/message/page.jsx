import Header from "@/components/Header";
import MessageItem from "@/components/message/MessageItem";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] p-[10px] md:w-[90%] md:mx-auto md:pt-[75px] md:mt-[20px] md:px-0'>
      <div className='hidden md:block'>
        <Header page='message' />
      </div>

      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Nhắn tin</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <div className='flex flex-col gap-0 md:gap-[10px]'>
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
      </div>

      <div className='md:hidden'>
        <NavBar page='message' />
      </div>
    </div>
  );
};

export default page;
