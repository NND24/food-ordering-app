import React from "react";

const RatingBar = ({ ratings }) => {
  // Tính tổng số lượng đánh giá
  const totalRatings = Object.values(ratings).reduce((sum, value) => sum + value, 0);

  return (
    <div className='flex flex-col gap-[8px w-full]'>
      {Object.keys(ratings)
        .sort((a, b) => b - a) // Sắp xếp từ 5 sao đến 1 sao
        .map((star) => {
          const count = ratings[star];
          const percentage = totalRatings ? (count / totalRatings) * 100 : 0;

          return (
            <div key={star} className='flex items-center gap-[10px]'>
              <span className='w-[20px] text-center text-[18px]'>{star}</span>
              <div className='flex-1 h-[10px] bg-[#d3d3d3] rounded-[5px] overflow-hidden'>
                <div
                  className='h-[100%] bg-[#fc6011] rounded-[5px] '
                  style={{ width: `${percentage}%`, transition: "width 0.3s ease-in-out" }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RatingBar;
