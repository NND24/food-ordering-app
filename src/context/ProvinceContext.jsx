"use client";
import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "app_province_location";
const DEFAULT_LOCATION = { lat: 200, lon: 200 };

const getSavedLocation = () => {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  } catch {
    return DEFAULT_LOCATION;
  }
};

const ProvinceContext = createContext();

export const ProvinceProvider = ({ children }) => {
  const [currentLocation, setCurrentLocationState] = useState(getSavedLocation);

  const setCurrentLocation = (location) => {
    setCurrentLocationState(location);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    }
  };

  return (
    <ProvinceContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </ProvinceContext.Provider>
  );
};

export const useProvince = () => useContext(ProvinceContext);
