import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='pt-[30px] pb-[100px] px-[20px]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Quán yêu thích</h3>
        <Link href='/notifications'>
          <Image src='/assets/notification.png' alt='' width={30} height={30} />
        </Link>
      </div>

      <div className='flex gap-[20px] my-[20px]'>
        <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
          <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[6px]' />
        </div>

        <div className='flex flex-1 items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

            <div className='flex items-center gap-[10px]'>
              <span className='text-[#636464]'>Cafe</span>
              <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
              <span className='text-[#636464]'>Western food</span>
            </div>

            <div className='flex items-center gap-[6px]'>
              <Image src='/assets/star-active.png' alt='' width={20} height={20} />
              <span className='text-[#fc6011]'>4.9</span>
              <span className='text-[#636464]'>{"(124 ratings)"}</span>
            </div>
          </div>

          <Image src='/assets/trash.png' alt='' width={30} height={30} />
        </div>
      </div>
      <div className='flex gap-[20px] my-[20px]'>
        <div className='relative flex flex-col gap-[4px] min-w-[90px] pt-[25%]'>
          <Image src='/assets/item_1.png' alt='' layout='fill' objectFit='cover' className='rounded-[6px]' />
        </div>

        <div className='flex flex-1 items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>Minute by tuk tuk</span>

            <div className='flex items-center gap-[10px]'>
              <span className='text-[#636464]'>Cafe</span>
              <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
              <span className='text-[#636464]'>Western food</span>
            </div>

            <div className='flex items-center gap-[6px]'>
              <Image src='/assets/star-active.png' alt='' width={20} height={20} />
              <span className='text-[#fc6011]'>4.9</span>
              <span className='text-[#636464]'>{"(124 ratings)"}</span>
            </div>
          </div>

          <Image src='/assets/trash.png' alt='' width={30} height={30} />
        </div>
      </div>

      <NavBar page='favorite' />
    </div>
  );
};

export default page;
