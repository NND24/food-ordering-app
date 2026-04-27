"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DetailHero = ({ store }) => {
  const router = useRouter();

  return (
    <Link href={`/store/${store._id}`} className='relative block w-full overflow-hidden' style={{ height: "calc(100vh - 225px)", minHeight: 280 }}>
      {/* Background image */}
      <Image
        src={store.avatar?.url || ""}
        alt={store.name}
        fill
        sizes='100vw'
        className='object-cover'
        priority
      />

      {/* Gradient overlay — dark at bottom for text legibility */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />

      {/* Open/Closed badge */}
      {store.openStatus && (
        <div className='absolute top-4 right-4 z-10'>
          <span
            className={`px-3 py-1 rounded-full text-[13px] font-semibold ${
              store.openStatus === "OPEN"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {store.openStatus === "OPEN" ? "Đang mở cửa" : "Đã đóng cửa"}
          </span>
        </div>
      )}

      {/* Text content */}
      <div className='absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 pt-10'>
        <h4 className='text-white text-[26px] md:text-[30px] font-bold leading-tight mb-1 drop-shadow line-clamp-2 max-w-[80%]'>
          {store.name}
        </h4>

        {/* Rating + categories row */}
        <div className='flex flex-wrap items-center gap-x-2 gap-y-1 mb-2'>
          {store.avgRating != 0 && (
            <div className='flex items-center gap-1'>
              <Image src='/assets/star_active.png' alt='' width={16} height={16} className='flex-shrink-0' />
              <span className='text-[#fc6011] font-semibold text-[14px]'>{store.avgRating.toFixed(1)}</span>
              {store.amountRating != 0 && (
                <span className='text-white/70 text-[13px]'>({store.amountRating})</span>
              )}
            </div>
          )}

          {store.amountRating != 0 && store.storeCategory.length > 0 && (
            <span className='text-white/40 text-[12px]'>•</span>
          )}

          <div className='flex flex-wrap items-center gap-x-1'>
            {store.storeCategory.slice(0, 3).map((category, index) => (
              <span
                key={category._id}
                className='text-white/80 text-[13px] hover:text-white hover:underline cursor-pointer whitespace-nowrap'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/search?category=${category._id}`);
                }}
              >
                {category.name}{index < Math.min(store.storeCategory.length, 3) - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>

        {store.description && (
          <p className='text-white/70 text-[13px] line-clamp-2'>{store.description}</p>
        )}
      </div>
    </Link>
  );
};

export default DetailHero;
