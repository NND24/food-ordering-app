"use client";
import React, { useEffect } from "react";

const ConfirmToast = ({ message, onConfirm, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[999]' onClick={onClose}>
      <div
        className='bg-white text-black p-6 rounded-lg shadow-lg max-w-sm text-center'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-2xl mb-5 font-bold'>{message}</p>
        <div className='flex justify-center gap-4 text-white font-bold'>
          <button
            className='px-4 py-2 bg-[#fc6011] hover:bg-[#e96a2a] rounded-md transition shadow-sm'
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Đồng ý
          </button>
          <button className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition shadow-sm' onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmToast;
