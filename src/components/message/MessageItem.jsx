import Image from "next/image";
import Link from "next/link";
import React from "react";

const MessageItem = () => {
  return (
    <Link
      href='/message/123'
      className='flex items-center gap-[15px] p-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:rounded-[8px]'
    >
      <div className='relative flex flex-col gap-[4px] w-[60px] pt-[60px]'>
        <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
      </div>

      <div className='flex flex-col flex-1'>
        <span className='text-[#4A4B4D] text-[20px] font-bold'>Nguyễn Văn A</span>
        <div className='flex items-center justify-between'>
          <span className='text-[#a4a5a8] line-clamp-1 w-[90%]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi obcaecati voluptatem, nemo aperiam
            doloremque, magnam quae id soluta inventore aut, vel corporis labore libero officiis. Voluptates reiciendis
            veniam aliquid eaque.
          </span>
          <span className='text-[#a4a5a8] line-clamp-1'>13:35</span>
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
