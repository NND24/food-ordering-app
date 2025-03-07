import Image from "next/image";
import React, { useState } from "react";

const ToppingItem = ({ topping }) => {
  const [check, setCheck] = useState(false);
  return (
    <div
      className='flex items-center justify-between py-[20px]'
      style={{ borderBottom: "1px solid #a3a3a3a3" }}
      onClick={() => setCheck(!check)}
    >
      <div className='flex items-center gap-[20px]'>
        {check ? (
          <Image src='/assets/check_box_checked.png' alt='' width={21} height={21} />
        ) : (
          <Image src='/assets/check_box_empty.png' alt='' width={20} height={20} />
        )}
        <h3 className='text-[#4A4B4D] text-[18px]'>{topping.name}</h3>
      </div>

      <span className='text-[#4A4B4D] text-[18px]'>+{topping.price}đ</span>
    </div>
  );
};

export default ToppingItem;
