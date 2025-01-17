import Image from "next/image";
import Link from "next/link";

const DetailHero = () => {
  return (
    <Link href='/restaurant/123' className='relative block w-full pt-[calc(100vh-225px)]'>
      <Image src='/assets/res_1.png' alt='' layout='fill' objectFit='cover' />

      <div className='absolute left-[35px] bottom-[calc(6%+24px+3.5vw)] flex flex-col items-start w-[79%] z-[20]'>
        <h4 className='text-[#e8e9e9] text-[20px] font-semibold px-[20px] py-[4px]'>Minute by tuk tuk</h4>

        <div className='flex items-center gap-[10px] px-[20px]'>
          <div className='flex items-center gap-[6px]'>
            <Image src='/assets/star-active.png' alt='' width={20} height={20} />
            <span className='text-[#fc6011]'>4.9</span>
            <span className='text-[#e8e9e9]'>{"(124 ratings)"}</span>
            <span className='text-[#e8e9e9]'>Cafe</span>
          </div>

          <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>

          <span className='text-[#e8e9e9]'>Western food</span>
        </div>
      </div>
    </Link>
  );
};

export default DetailHero;
