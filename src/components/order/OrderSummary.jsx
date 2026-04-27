import React from "react";

const OrderSummary = ({ detailItems, price, subtotalPrice, shippingFee = 0, totalDiscount = 0 }) => {
  const displaySubtotal = subtotalPrice ?? price ?? 0;
  const displayTotal = displaySubtotal - totalDiscount + shippingFee;

  return (
    <>
      <div className='pb-[20px] flex items-center justify-between'>
        <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold'>Tóm tắt đơn hàng</span>
      </div>

      <div className='flex flex-col gap-[8px]'>
        {detailItems &&
          detailItems.map((item, index) => {
            const dishName = item.dishName || item.dish?.name || "Món ăn";
            const computedToppingsPrice =
              (Array.isArray(item.toppings)
                ? item.toppings.reduce((sum, topping) => sum + (topping.price || 0), 0)
                : 0) * item.quantity;
            const itemTotal =
              item.price != null
                ? item.price
                : (item.dish?.price || 0) * item.quantity + computedToppingsPrice;

            return (
              <div
                key={index}
                className='flex gap-[15px] pb-[15px] border-b border-gray-200 dark:border-gray-700'
              >
                <div className='p-[8px] rounded-[6px] border border-gray-200 dark:border-gray-600 w-[40px] h-[40px] flex-shrink-0'>
                  <span className='text-[#fc6011] font-semibold'>{item.quantity}x</span>
                </div>

                <div className='flex flex-col flex-1'>
                  <div className='flex justify-between'>
                    <span className='text-[#4A4B4D] dark:text-gray-100 text-[18px] font-bold line-clamp-1 pr-1'>
                      {dishName}
                    </span>
                    <span className='text-[#4A4B4D] dark:text-gray-100 whitespace-nowrap'>
                      {Number(itemTotal.toFixed(0)).toLocaleString("vi-VN")}đ
                    </span>
                  </div>

                  {Array.isArray(item.toppings) &&
                    item.toppings.map((topping, ti) => (
                      <div key={ti} className='flex justify-between'>
                        <span className='text-[#a4a5a8] dark:text-gray-400'>
                          {topping.toppingName || topping.name}
                        </span>
                        <span className='text-[#a4a5a8] dark:text-gray-400'>
                          {Number((topping.price || 0).toFixed(0)).toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    ))}

                  {item.note && (
                    <p className='text-[#a4a5a8] dark:text-gray-400 text-sm'>Ghi chú: {item.note}</p>
                  )}
                </div>
              </div>
            );
          })}

        <div className='pt-[8px] flex flex-col gap-[6px]'>
          {displaySubtotal > 0 && (
            <div className='flex items-center justify-between'>
              <span className='text-[#4A4B4D] dark:text-gray-300'>Tổng tạm tính</span>
              <span className='text-[#4A4B4D] dark:text-gray-300'>
                {Number(displaySubtotal.toFixed(0)).toLocaleString("vi-VN")}đ
              </span>
            </div>
          )}
          {totalDiscount > 0 && (
            <div className='flex items-center justify-between'>
              <span className='text-green-600 dark:text-green-400'>Giảm giá</span>
              <span className='text-green-600 dark:text-green-400'>
                -{Number(totalDiscount.toFixed(0)).toLocaleString("vi-VN")}đ
              </span>
            </div>
          )}
          {shippingFee > 0 && (
            <div className='flex items-center justify-between'>
              <span className='text-[#4A4B4D] dark:text-gray-300'>Phí vận chuyển</span>
              <span className='text-[#4A4B4D] dark:text-gray-300'>
                {Number(shippingFee.toFixed(0)).toLocaleString("vi-VN")}đ
              </span>
            </div>
          )}
          <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-[6px]'>
            <span className='text-[#4A4B4D] dark:text-gray-100 font-bold'>Tổng cộng</span>
            <span className='text-[#fc6011] font-bold text-[18px]'>
              {Number(displayTotal.toFixed(0)).toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
