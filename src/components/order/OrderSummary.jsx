import React from "react";

const OrderSummary = ({ detailItems, price }) => {
  return (
    <>
      <div className='pb-[20px] flex items-center justify-between'>
        <span className='text-[#4A4B4D] text-[18px] font-bold'>Tóm tắt đơn hàng</span>
      </div>

      <div className=' flex flex-col gap-[8px]'>
        {detailItems &&
          detailItems.map((item) => {
            const dishPrice = (item.dish?.price || 0) * item.quantity;
            const toppingsPrice =
              (Array.isArray(item.toppings)
                ? item.toppings.reduce((sum, topping) => sum + (topping.price || 0), 0)
                : 0) * item.quantity;
            const totalPrice = dishPrice + toppingsPrice;
            return (
              <div
                className='flex gap-[15px] pb-[15px]'
                style={{ borderBottom: "1px solid #a3a3a3a3" }}
                name='cartItems'
              >
                <div className='p-[8px] rounded-[6px] border border-[#a3a3a3a3] border-solid w-[40px] h-[40px]'>
                  <span className='text-[#fc6011] font-semibold' name='quantity'>
                    {item.quantity}x
                  </span>
                </div>

                <div className='flex flex-1 justify-between'>
                  <div className='flex flex-col'>
                    <h3 className='text-[#4A4B4D] text-[18px] font-bold' name='dishName'>
                      {item.dish.name}
                    </h3>
                    {item.toppings.map((topping) => (
                      <p className='text-[#a4a5a8]' name='toppingName'>
                        {topping.name}
                      </p>
                    ))}
                  </div>
                  <span className='text-[#4A4B4D]' name='price'>
                    {totalPrice.toFixed(0)}đ
                  </span>
                </div>
              </div>
            );
          })}

        <div className='pt-[15px]'>
          <div className='flex items-center justify-between'>
            <span className='text-[#4A4B4D]'>Tổng tạm tính</span>
            <span className='text-[#4A4B4D]'>{price && price.toFixed(0)}đ</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[#4A4B4D]'>Phí áp dụng</span>
            <span className='text-[#4A4B4D]'>{price && price.toFixed(0)}đ</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
