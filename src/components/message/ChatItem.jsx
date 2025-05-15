"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteChatMutation, useGetAllChatsQuery } from "../../redux/features/chat/chatApi";
import { FaEllipsis } from "react-icons/fa6";
import Swal from "sweetalert2";

const ChatItem = ({ chat }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchAllChats } = useGetAllChatsQuery();
  const [deleteChat, { isSuccess }] = useDeleteChatMutation();

  const handleDeleteChat = async () => {
    await deleteChat(chat._id);
  };

  useEffect(() => {
    if (isSuccess) {
      refetchAllChats();
    }
  }, [deleteChat, isSuccess]);

  const confirmDeleteChat = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa tin nhắn này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      handleDeleteChat();
    }
  };

  useEffect(() => {
    if (chat) {
      if (chat.store) {
        setAvatar(chat.store.avatar.url);
        setName(chat.store.name);
      } else {
        if (chat.users[0]._id === currentUser._id) {
          setAvatar(chat.users[1].avatar.url);
        } else {
          setAvatar(chat.users[0].avatar.url);
        }

        if (chat.users[0]._id === currentUser._id) {
          setName(chat.users[1].name);
        } else {
          setName(chat.users[0].name);
        }
      }
    }
  }, [chat]);

  return (
    <Link
      href={`/message/${chat._id}`}
      className='relative flex items-center gap-[10px] p-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:rounded-[8px]'
    >
      <div className='relative flex flex-col gap-[4px] w-[60px] pt-[60px]'>
        {chat.users.length === 2 && (
          <Image src={avatar || ""} alt='' layout='fill' objectFit='cover' className='rounded-full' />
        )}
      </div>

      <div className='flex flex-col flex-1'>
        {chat.users.length === 2 && (
          <span className='text-[#4A4B4D] text-[20px] font-bold line-clamp-1'>{name || ""}</span>
        )}
        <div className='flex items-center justify-between'>
          <span className='text-[#a4a5a8] line-clamp-1 w-[90%]'>{chat?.latestMessage?.content || ""}</span>
          <span className='text-[#a4a5a8] line-clamp-1 text-end'>
            {moment.utc(chat?.latestMessage?.createdAt).local().fromNow()}
          </span>
        </div>
      </div>

      <div
        className='absolute top-[25%] translate-y-[-25%] right-[2%] py-[4px] px-[6px] w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-[#cccfd4] group z-50'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <FaEllipsis className='text-[18px] text-subTextColor dark:text-subTextColor-dark translate-y-[2px]' />

        <div className='hidden group-hover:block absolute top-[-160%] left-[-50px] shadow-md bg-white p-[10px] rounded-[6px] font-medium z-[1]'>
          <p
            className='px-[15px] py-[5px] rounded-[6px] cursor-pointer select-none hover:bg-[#d1d3d9] text-[14px] '
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              confirmDeleteChat();
            }}
          >
            Xóa
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
