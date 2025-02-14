"use client";
import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ name: "", lat: 200, lon: 200 });

  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};

export const useLocation = () => useContext(LocationContext);
