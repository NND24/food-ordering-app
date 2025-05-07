import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClearCartItemMutation, useGetUserCartQuery } from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const CartItem = ({ cartItem }) => {
  const [quantity, setQuantity] = useState(0);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { refetch: refetchUserCart } = useGetUserCartQuery(null, {
    skip: !currentUser,
  });
  const [clearCartItem, { isSuccess: clearCartItemSuccess }] = useClearCartItemMutation();

  useEffect(() => {
    const totalQuantity = cartItem.items.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(totalQuantity);
  }, [cartItem.items]);

  const handleClearCartItem = async () => {
    await clearCartItem(cartItem.store._id);
  };

  useEffect(() => {
    if (clearCartItemSuccess) {
      refetchUserCart();
      toast.success("Xóa khỏi giỏ hàng thành công!");
    }
  }, [clearCartItemSuccess]);

  const confirmClearCartItem = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa khỏi giỏ hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      await handleClearCartItem();
    }
  };

  return (
    <Link href={`/restaurant/${cartItem.store._id}`} className='relative'>
      <div className='relative flex flex-col gap-[4px] min-w-[300px] pt-[45%]'>
        <Image
          src={cartItem.store.avatar.url}
          alt=''
          layout='fill'
          objectFit='cover'
          className='rounded-[6px] justify-center'
        />
      </div>

      <div>
        <div className='flex items-center justify-between gap-[10px]'>
          <h4 className='text-[#4A4B4D] text-[20px] font-semibold py-[4px] line-clamp-1 flex-1'>
            {cartItem.store.name}
          </h4>
          <p className='text-[#4A4B4D] font-medium'>{quantity} món</p>
        </div>

        <div className='flex items-center gap-[4px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
          {cartItem.store.storeCategory.map((category, index) => (
            <Link href={`/search?category=${category._id}`} className='flex items-center gap-[4px]' key={category._id}>
              <span className='text-[#636464]'>{category.name}</span>
              {index !== cartItem.store.storeCategory.length - 1 && (
                <div className='w-[4px] h-[4px] rounded-full bg-[#fc6011]'></div>
              )}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-[6px]'>
          {cartItem && cartItem.store.avgRating != 0 && (
            <>
              <div className='relative w-[20px] pt-[20px] md:w-[15px] md:pt-[15px]'>
                <Image src='/assets/star_active.png' alt='' layout='fill' objectFit='fill' />
              </div>
              <span className='text-[#fc6011] md:text-[14px]'>{cartItem.store.avgRating.toFixed(2)}</span>
            </>
          )}
          {cartItem.store.amountRating != 0 && (
            <span className='text-[#636464] md:text-[14px]'>{`(${cartItem.store.amountRating} đánh giá)`}</span>
          )}
        </div>
      </div>

      <div
        className='absolute top-[10px] right-[10px] z-10 p-[8px] rounded-full bg-[#e7e7e7c4] hover:bg-[#e7e7e7e8] cursor-pointer'
        onClick={(e) => {
          e.preventDefault();
          confirmClearCartItem();
        }}
      >
        <div className='relative w-[30px] pt-[30px] md:w-[24px] md:pt-[24px]'>
          <Image src='/assets/trash.png' alt='' layout='fill' objectFit='contain' />
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
