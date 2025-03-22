import Image from "next/image";
import React, { useEffect, useState } from "react";

const ToppingItem = ({ topping, cartItem, handleChooseTopping }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasTopping = cartItem?.toppings?.some((tp) => tp._id === topping._id);

    setChecked(hasTopping);
  }, [cartItem]);

  return (
    <div
      className='flex items-center justify-between py-[20px] cursor-pointer'
      name='checkedBtn'
      style={{ borderBottom: "1px solid #a3a3a3a3" }}
      onClick={() => {
        handleChooseTopping(topping, topping.price);
        setChecked(!checked);
      }}
    >
      <div className='flex items-center gap-[20px]'>
        {checked ? (
          <Image src='/assets/check_box_checked.png' className='checked' alt='' width={21} height={21} />
        ) : (
          <Image src='/assets/check_box_empty.png' className='unchecked' alt='' width={20} height={20} />
        )}
        <h3 className='text-[#4A4B4D] text-[18px]' name='toppingName'>
          {topping.name}
        </h3>
      </div>

      <span className='text-[#4A4B4D] text-[18px]' name='toppingPrice'>
        +{topping.price}đ
      </span>
    </div>
  );
};

export default ToppingItem;
