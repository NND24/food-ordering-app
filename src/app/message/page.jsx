"use client";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import MobileHeader from "../../components/header/MobileHeader";
import Heading from "../../components/Heading";
import ChatItem from "../../components/message/ChatItem";
import NavBar from "../../components/NavBar";
import React, { useEffect } from "react";
import { useGetAllChatsQuery } from "../../redux/features/chat/chatApi";

const page = () => {
  const chatState = useSelector((state) => state.chat);
  const { allChats } = chatState;
  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchAllChats } = useGetAllChatsQuery();

  useEffect(() => {
    if (currentUser) {
      refetchAllChats();
    }
  }, [currentUser, refetchAllChats]);

  return (
    <div className='pt-[30px] pb-[100px] ] lg:w-[60%] md:w-[80%] md:mx-auto md:pt-[75px] md:mt-[20px] md:px-0'>
      <Heading title='Tin nhắn' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='message' />
      </div>

      <MobileHeader />

      <div className='p-[10px] flex flex-col gap-0 md:gap-[10px]'>
        {allChats && allChats.map((chat, index) => <ChatItem chat={chat} key={index} />)}
      </div>

      <div className='md:hidden'>
        <NavBar page='message' />
      </div>
    </div>
  );
};

export default page;
