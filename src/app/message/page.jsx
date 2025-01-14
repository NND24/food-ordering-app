import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Nhắn tin</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <Link href='/message/123' className='flex items-center gap-[15px] py-[20px]'>
        <div className='relative flex flex-col gap-[4px] w-[60px] pt-[60px]'>
          <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-full' />
        </div>

        <div className='flex flex-col flex-1'>
          <span className='text-[#4A4B4D] text-[20px] font-bold'>Nguyễn Văn A</span>
          <div className='flex items-center justify-between'>
            <span className='text-[#a4a5a8] line-clamp-1 w-[90%]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi obcaecati voluptatem, nemo aperiam
              doloremque, magnam quae id soluta inventore aut, vel corporis labore libero officiis. Voluptates
              reiciendis veniam aliquid eaque.
            </span>
            <span className='text-[#a4a5a8] line-clamp-1'>13:35</span>
          </div>
        </div>
      </Link>

      <NavBar page='message' />
    </div>
  );
};

export default page;
