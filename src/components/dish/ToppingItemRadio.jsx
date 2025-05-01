import Image from "next/image";

const ToppingItemRadio = ({ topping, toppingGroup, selectedTopping, handleChooseTopping }) => {
  return (
    <div
      className='flex items-center justify-between py-[20px] cursor-pointer'
      name='checkedBtn'
      style={{ borderBottom: "1px solid #a3a3a3a3" }}
      onClick={() => {
        handleChooseTopping(topping, topping.price, toppingGroup);
      }}
    >
      <div className='flex items-center gap-[20px]'>
        {selectedTopping?.some((tp) => tp._id === topping._id) ? (
          <Image src='/assets/button_active.png' className='checked' alt='' width={21} height={21} />
        ) : (
          <Image src='/assets/button.png' className='unchecked' alt='' width={20} height={20} />
        )}
        <h3 className='text-[#4A4B4D] text-[18px]' name='toppingName'>
          {topping.name}
        </h3>
      </div>

      <span className='text-[#4A4B4D] text-[18px]' name='toppingPrice'>
        +{Number(topping.price).toLocaleString("vi-VN")}đ
      </span>
    </div>
  );
};

export default ToppingItemRadio;
