"use client";
import { createContext, useContext, useState } from "react";

const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
  const [storeVouchers, setStoreVouchers] = useState({});

  const toggleVoucher = (storeId, voucher) => {
    setStoreVouchers((prev) => {
      const current = prev[storeId] || [];
      const exists = current.some((v) => v._id === voucher._id);
      if (exists) {
        return { ...prev, [storeId]: current.filter((v) => v._id !== voucher._id) };
      }
      return { ...prev, [storeId]: [...current, voucher] };
    });
  };

  const clearVouchers = (storeId) => {
    setStoreVouchers((prev) => ({ ...prev, [storeId]: [] }));
  };

  return (
    <VoucherContext.Provider value={{ storeVouchers, toggleVoucher, clearVouchers }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => useContext(VoucherContext);
