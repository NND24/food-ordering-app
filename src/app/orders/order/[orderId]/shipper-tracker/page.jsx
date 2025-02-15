"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Kết nối với server WebSocket
const socket = io("http://localhost:5000");

// Tạo icon cho shipper
const shipperIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/194/194933.png",
  iconSize: [40, 40],
});

const Page = () => {
  const [shipperLocation, setShipperLocation] = useState([21.0285, 105.8542]); // Tọa độ mặc định (Hà Nội)
  const [restaurantLocation] = useState([21.0307, 105.852]); // Vị trí quán ăn
  const [customerLocation] = useState([21.0245, 105.857]); // Vị trí khách hàng
  const [path, setPath] = useState([]); // Đường đi của shipper

  useEffect(() => {
    socket.on("updateLocation", (data) => {
      setShipperLocation([data.lat, data.lon]);
      setPath((prevPath) => [...prevPath, [data.lat, data.lon]]);
    });

    return () => socket.off("updateLocation");
  }, []);

  return (
    <div className='pt-[85px] pb-[140px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Thêm địa chỉ' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:rounded-[10px] md:shadow-md md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-2 bg-white h-[85px] px-4 md:static'>
          <Link href='/account/location' className='relative w-[30px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
        </div>

        <div className='w-full h-[500px] mt-4 relative'>
          <MapContainer center={shipperLocation} zoom={15} style={{ height: "100%", width: "100%" }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

            {/* Marker của shipper */}
            <Marker position={shipperLocation} icon={shipperIcon}></Marker>

            {/* Marker của quán ăn */}
            <Marker position={restaurantLocation}></Marker>

            {/* Marker của khách hàng */}
            <Marker position={customerLocation}></Marker>

            {/* Đường đi của shipper */}
            <Polyline positions={path} color='blue' />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
