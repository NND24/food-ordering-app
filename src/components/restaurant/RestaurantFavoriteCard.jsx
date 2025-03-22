import Image from "next/image";
import React, { useEffect, useState } from "react";
import ConfirmToast from "../ConfirmToast";
import { useRemoveFavoriteMutation } from "../../redux/features/favorite/favoriteApi";
import Link from "next/link";
import { toast } from "react-toastify";

const RestaurantFavoriteCard = ({ store }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const [removeFavorite, { isSuccess: removeFavoriteSuccess }] = useRemoveFavoriteMutation();

  const handleRemoveFavorite = async () => {
    const data = { storeId: store._id };
    await removeFavorite(data);
  };

  useEffect(() => {
    if (removeFavoriteSuccess) {
      toast.success("Xóa khỏi yêu thích thành công!");
    }
  }, [removeFavoriteSuccess]);

  return (
    <>
      <Link href={`/restaurant/${store._id}`} className='relative'>
        <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
          <Image src={store.avatar.url} alt='' layout='fill' objectFit='cover' className='rounded-[6px]' />
        </div>

        <div className='flex flex-1 items-center justify-between md:p-[10px]'>
          <div className='flex flex-col'>
            <span className='text-[#4A4B4D] text-[20px] font-semibold'>{store.name}</span>

            <div className='flex items-center gap-[4px]'>
              {store.storeCategory.map((category, index) => (
                <div className='flex items-center gap-[4px]' key={category._id}>
                  <span className='text-[#636464]'>{category.name}</span>
                  {index !== store.storeCategory.length - 1 && <span className='text-[#636464]'>-</span>}
                </div>
              ))}
            </div>

            <div className='flex items-center gap-[6px]'>
              {store.avgRating != 0 && (
                <>
                  <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
                    <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
                  </div>
                  <span className='text-[#fc6011] md:text-[14px]'>{store.avgRating.toFixed(2)}</span>
                </>
              )}
              {store.amountRating != 0 && (
                <span className='text-[#636464] md:text-[14px]'>{`(${store.amountRating} đánh giá)`}</span>
              )}
            </div>
          </div>

          <div
            className='absolute top-[10px] right-[10px] z-10 p-[8px] rounded-full bg-[#e7e7e7c4] hover:bg-[#e7e7e7e8] cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              setShowConfirm(true);
            }}
          >
            <div className='relative w-[30px] pt-[30px] md:w-[24px] md:pt-[24px]'>
              <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
        </div>
      </Link>
      {showConfirm && (
        <ConfirmToast
          message='Bạn có chắc chắn muốn xóa khỏi yêu thích?'
          onConfirm={() => {
            handleRemoveFavorite();
          }}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default RestaurantFavoriteCard;
