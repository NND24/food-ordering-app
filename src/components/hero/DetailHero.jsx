import Image from "next/image";
import Link from "next/link";

const DetailHero = ({ store }) => {
  return (
    <Link href={`/restaurant/${store._id}`} className='relative block w-full pt-[calc(100vh-225px)]'>
      <Image src={store.avatar.url || ""} alt='' layout='fill' objectFit='fill' />

      <div className='absolute left-[35px] bottom-[calc(6%+24px+3.5vw)] px-[20px] flex flex-col items-start w-[79%] z-[20]'>
        <h4 className='text-[#e8e9e9] text-[20px] font-semibold py-[4px] max-w-[800px]'>{store.name}</h4>

        <div className={`flex items-start ${store.amountRating != 0 && "gap-[10px]"}`}>
          <div className='flex items-center gap-[6px]'>
            {store.avgRating != 0 && (
              <>
                <Image src='/assets/star_active.png' alt='' width={20} height={20} />
                <span className='text-[#fc6011]'>{store.avgRating.toFixed(2)}</span>
              </>
            )}
            {store.amountRating != 0 && (
              <span className='text-[#e8e9e9] whitespace-nowrap'>{`(${store.amountRating} đánh giá)`}</span>
            )}
            {store.amountRating != 0 && <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>}
          </div>

          <div className='flex flex-wrap items-center gap-[4px] max-w-[800px]'>
            {store.storeCategory.slice(0, 3).map((category, index) => (
              <Link href={`/search?category=${category._id}`} className='flex items-center' key={category._id}>
                <span className='text-[#e8e9e9] whitespace-nowrap'>{category.name}</span>
                {index !== store.storeCategory.length - 1 && <span className='text-[#e8e9e9]'>, </span>}
              </Link>
            ))}
          </div>
        </div>

        <span className='text-[#e8e9e9] pt-[4px]'>{store.description}</span>
      </div>
    </Link>
  );
};

export default DetailHero;
