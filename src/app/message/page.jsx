import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import MessageItem from "../../components/message/MessageItem";
import NavBar from "../../components/NavBar";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] md:w-[90%] md:mx-auto md:pt-[75px] md:mt-[20px] md:px-0'>
      <Heading title='Tin nhắn' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='message' />
      </div>

      <MobileHeader text='Tin nhắn' />

      <div className='p-[10px] flex flex-col gap-0 md:gap-[10px]'>
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
