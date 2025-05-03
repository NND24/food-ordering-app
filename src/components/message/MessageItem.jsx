"use client";
import { useDeleteMessageMutation } from "../../redux/features/message/messageApi";
import { useSocket } from "../../context/SocketContext";
import React, { useState, useEffect } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Image from "next/image";
import Swal from "sweetalert2";

const MessageItem = ({ msg, chatId }) => {
  const { socket } = useSocket();

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const [deleteMessage, { isSuccess: deleteMessageSuccess }] = useDeleteMessageMutation();

  const handleDeleteMessage = async () => {
    await deleteMessage(msg._id);
  };

  useEffect(() => {
    if (deleteMessageSuccess) {
      socket.emit("deleteMessage", chatId);
    }
  }, [deleteMessage, deleteMessageSuccess]);

  const confirmDeleteMessage = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa tin nhắn này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      await handleDeleteMessage();
    }
  };

  return (
    <div
      className={`relative w-full flex items-end gap-[10px] py-[10px] ${
        msg?.sender._id == currentUser._id ? "justify-end pl-[60px]" : "pr-[60px]"
      }`}
    >
      {msg?.content.length > 0 && (
        <div className='relative py-[8px] px-[16px] bg-[#e3e3e5] max-w-[70%] rounded-lg break-words word-wrap'>
          <span className='text-[#4A4B4D] text-[18px] break-words'>{msg?.content}</span>

          {msg?.sender._id == currentUser._id && (
            <div className='absolute top-[50%] translate-y-[-50%] left-[-35px] py-[4px] px-[6px] w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-[#cccfd4] group'>
              <FaEllipsis className='text-[18px] text-subTextColor dark:text-subTextColor-dark translate-y-[2px]' />

              <div className='hidden group-hover:block absolute top-[-160%] left-[-50px] shadow-md bg-white p-[10px] rounded-[6px] font-medium z-[1]'>
                <p
                  className='px-[15px] py-[5px] rounded-[6px] cursor-pointer select-none hover:bg-[#d1d3d9] text-[14px] '
                  onClick={(e) => {
                    e.preventDefault();
                    confirmDeleteMessage();
                  }}
                >
                  Xóa
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {msg?.image && (
        <>
          <div className='relative w-[60%] h-[40%] pt-[40%] rounded-[6px] overflow-hidden'>
            <Image loading='lazy' layout='fill' src={msg?.image?.url} alt='' objectFit='cover' />
          </div>

          {msg?.sender._id == currentUser._id && (
            <div className='absolute top-[50%] translate-y-[-50%] left-[40%] py-[4px] px-[6px] w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-[#cccfd4] group'>
              <FaEllipsis className='text-[18px] text-subTextColor dark:text-subTextColor-dark translate-y-[2px]' />

              <div className='hidden group-hover:block absolute top-[-160%] left-[-50px] shadow-md bg-white p-[10px] rounded-[6px] font-medium z-[1]'>
                <p
                  className='px-[15px] py-[5px] rounded-[6px] cursor-pointer select-none hover:bg-[#d1d3d9] text-[14px] '
                  onClick={() => {
                    handleDeleteMessage(msg?._id);
                  }}
                >
                  Xóa
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageItem;
