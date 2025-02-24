"use client";
import {
  useDeleteMessageMutation,
  useGetAllMessagesQuery,
  useSendMessageMutation,
} from "../../../redux/features/message/messageApi";
import Header from "../../../components/header/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useSocket } from "../../../context/SocketContext";
import Link from "next/link";
import Dropzone from "react-dropzone";
import { useUploadImagesMutation } from "../../../redux/features/upload/uploadApi";
import { FaEllipsis } from "react-icons/fa6";

const page = () => {
  const { id: chatId } = useParams();
  const { socket } = useSocket();

  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const [sendMessage, { isSuccess: sendMessageSuccess }] = useSendMessageMutation();
  const [deleteMessage, { isSuccess: deleteMessageSuccess }] = useDeleteMessageMutation();
  const { data, error, isLoading, refetch } = useGetAllMessagesQuery(chatId, {
    skip: !chatId,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!socket || !chatId) return;

    socket.emit("joinChat", chatId);

    return () => {
      socket.emit("leaveChat", chatId);
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("messageReceived", (newMessage) => {
      refetch();
    });

    socket.on("messageDeleted", () => {
      refetch();
    });

    return () => {
      socket.off("messageReceived");
      socket.off("messageDeleted");
    };
  }, [socket]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await sendMessage({ id: chatId, data: { content: message } }).unwrap();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendImage = async () => {
    if (image) {
      const formData = new FormData();
      for (let i = 0; i < image?.length; i++) {
        formData.append("file", image[i]);
      }
      const result = await uploadImages(formData).unwrap();
      let data = { content: "", image: result[0] };
      await sendMessage({ id: chatId, data }).unwrap();
      socket.emit("sendMessage", { id: chatId, data });
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      handleSendImage();
    }
  }, [image]);

  useEffect(() => {
    if (sendMessageSuccess) {
      socket.emit("sendMessage", { id: chatId, data: { content: message } });
      setMessage("");
    }
  }, [sendMessage, sendMessageSuccess]);

  const [uploadImages] = useUploadImagesMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDeleteMessage = async (messageId) => {
    await deleteMessage(messageId);
  };

  useEffect(() => {
    if (deleteMessageSuccess) {
      socket.emit("deleteMessage", chatId);
    }
  }, [deleteMessage, deleteMessageSuccess]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  return (
    <div className='pt-[85px] pb-[90px] md:pb-[0px] px-[20px] h-full md:bg-[#f9f9f9]'>
      <div className='hidden md:block'>
        <Header page='message' />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-[#a3a3a3a3] md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[20px] bg-[#fff] h-[85px] px-[20px] md:static'>
          <Link href='/message'>
            <Image src='/assets/arrow_left_long.png' alt='' width={25} height={25} />
          </Link>
          <div className='flex items-center gap-[10px] py-[20px]'>
            <div className='relative flex flex-col gap-[4px] w-[50px] pt-[50px]'>
              <Image
                src={
                  data?.chat?.users[0]._id === currentUser._id
                    ? data?.chat?.users[1]?.avatar?.url
                    : data?.chat?.users[0]?.avatar?.url
                }
                alt=''
                layout='fill'
                objectFit='cover'
                className='rounded-full'
              />
            </div>

            <div className='flex flex-col flex-1'>
              <span className='text-[#4A4B4D] text-[18px] font-bold'>
                {data?.chat?.users[0]._id === currentUser._id ? data?.chat?.users[1].name : data?.chat?.users[0].name}
              </span>
              <span className='text-[#a4a5a8]'>
                {moment.utc(data?.chat?.latestMessage?.createdAt).local().fromNow()}
              </span>
            </div>
          </div>
        </div>

        <div className='md:overflow-y-auto md:h-[calc(100vh-260px)] md:p-[20px]'>
          {data?.messages?.map((msg, index) => (
            <div
              key={index}
              className={`relative w-full flex items-end gap-[10px] py-[10px] ${
                msg?.sender?._id === currentUser._id ? "justify-end pl-[60px]" : "pr-[60px]"
              }`}
            >
              {msg?.content.length > 0 && (
                <div className='relative py-[8px] px-[16px] bg-[#e3e3e5] max-w-[70%] rounded-lg break-words word-wrap'>
                  <span className='text-[#4A4B4D] text-[18px] break-words'>{msg?.content}</span>

                  {msg?.sender?._id === currentUser._id && (
                    <div className='absolute top-[50%] translate-y-[-50%] left-[-35px] py-[4px] px-[6px] w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-[#cccfd4] group'>
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
                </div>
              )}
              {msg?.image && (
                <>
                  <div className='relative w-[60%] h-[40%] pt-[40%] rounded-[6px] overflow-hidden'>
                    <Image loading='lazy' layout='fill' src={msg?.image?.url} alt='' objectFit='cover' />
                  </div>

                  {msg?.sender?._id === currentUser._id && (
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
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div
          className='fixed bottom-0 left-0 right-0 flex items-center justify-between gap-[20px] p-[20px] bg-[#fff] md:static'
          style={{ borderTop: "1px solid #e0e0e0a3" }}
        >
          <div className='flex flex-1 items-center bg-[#e8e9e9] text-[#636464] px-[20px] py-[10px] rounded-[8px] gap-[8px]'>
            <input
              type='text'
              name=''
              id=''
              placeholder='Nhập tin nhắn...'
              className='bg-[#e8e9e9] text-[18px] w-full'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <Image
            src='/assets/send.png'
            alt=''
            width={30}
            height={30}
            className='object-contain cursor-pointer'
            onClick={handleSendMessage}
          />
          <Dropzone
            maxFiles={1}
            accept={{ "image/*": [] }}
            onDrop={(acceptedFiles) =>
              setImage(
                acceptedFiles.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                )
              )
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Image
                    src='/assets/camera.png'
                    alt=''
                    width={30}
                    height={30}
                    className='object-contain cursor-pointer'
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default page;
