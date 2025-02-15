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

const shipperIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9561/9561688.png",
  iconSize: [40, 40],
});

const restaurantIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/433/433087.png",
  iconSize: [40, 40],
});

const customerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2314/2314433.png",
  iconSize: [40, 40],
});

const Page = () => {
  const mapRef = useRef(null);

  const [shipperLocation, setShipperLocation] = useState([21.0307, 105.7837]); // Cầu Giấy
  const [restaurantLocation] = useState([21.051, 105.8352]); // Hồ Tây
  const [customerLocation] = useState([20.9955, 105.8495]); // Hoàng Mai
  const [distanceShipperToRestaurant, setDistanceShipperToRestaurant] = useState(0);
  const [distanceShipperToCustomer, setDistanceShipperToCustomer] = useState(0);
  const [distanceRestaurantToCustomer, setDistanceRestaurantToCustomer] = useState(0);
  const [timeShipperToRestaurant, setTimeShipperToRestaurant] = useState(0);
  const [timeShipperToCustomer, setTimeShipperToCustomer] = useState(0);
  const [timeRestaurantToCustomer, setTimeRestaurantToCustomer] = useState(0);

  const [path, setPath] = useState([]); // Đường đi của shipper

  const indexRef = useRef(0);

  const route = [
    [21.0307, 105.7837], // Điểm bắt đầu (Shipper ở Cầu Giấy)
    [21.035, 105.79], // Đường qua Công viên Nghĩa Đô
    [21.0385, 105.7952], // Tiến về Xuân Thủy
    [21.0412, 105.805], // Giữa đường (Tây Hồ)
    [21.0445, 105.815], // Đi qua Lạc Long Quân
    [21.051, 105.8352], // Quán ăn (Hồ Tây, gần Phủ Tây Hồ)
    [21.0485, 105.84], // Đường về, vào trung tâm
    [21.045, 105.842], // Qua đường Yên Phụ
    [21.04, 105.8455], // Tiếp tục vào trung tâm
    [21.035, 105.847], // Vào Quận Ba Đình
    [21.03, 105.85], // Qua Đội Cấn
    [21.0255, 105.8535], // Đường vào Hai Bà Trưng
    [21.02, 105.855], // Đi qua Lê Duẩn
    [21.015, 105.855], // Điểm gần cuối (Hai Bà Trưng)
    [21.005, 105.853], // Đường qua Định Công
    [20.9955, 105.8495], // Đến khách hàng (Hoàng Mai)
  ];

  useEffect(() => {
    const sendLocation = () => {
      if (indexRef.current < route.length) {
        const [lat, lon] = route[indexRef.current];
        socket.emit("updateLocation", { lat, lon });
        indexRef.current++;
        setTimeout(sendLocation, 3000); // Cập nhật mỗi 3 giây
      } else {
        console.log("Shipper đã đến nơi!");
        socket.disconnect();
      }
    };

    sendLocation();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("updateLocation", (data) => {
      setShipperLocation([data.lat, data.lon]);
      setPath((prevPath) => [...prevPath, [data.lat, data.lon]]);
    });

    return () => {
      socket.off("updateLocation");
    };
  }, []);

  const haversineDistance = (coords1, coords2) => {
    const R = 6371; // Bán kính Trái Đất (km)
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách tính bằng km
  };

  const calculateTravelTime = (distance, speed = 40) => {
    return distance / speed; // Thời gian tính theo giờ
  };

  useEffect(() => {
    if (shipperLocation) {
      handleFlyToPosition(shipperLocation);

      const newDistanceToRestaurant = haversineDistance(shipperLocation, restaurantLocation);
      const newDistanceToCustomer = haversineDistance(shipperLocation, customerLocation);
      const newDistanceRestaurantToCustomer = haversineDistance(restaurantLocation, customerLocation);

      setDistanceShipperToRestaurant(newDistanceToRestaurant);
      setDistanceShipperToCustomer(newDistanceToCustomer);
      setDistanceRestaurantToCustomer(newDistanceRestaurantToCustomer);
      setTimeShipperToRestaurant(calculateTravelTime(newDistanceToRestaurant));
      setTimeShipperToCustomer(calculateTravelTime(newDistanceToCustomer));
      setTimeRestaurantToCustomer(calculateTravelTime(newDistanceRestaurantToCustomer));
    }
  }, [shipperLocation]);

  const handleFlyToPosition = (position) => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 15, { duration: 1 });
    }
  };

  return (
    <div className='pt-[85px] pb-[140px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
      <Heading title='Theo dõi vị trí đơn hàng' />
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:rounded-[10px] md:shadow-md md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-2 bg-white h-[85px] px-4 md:static'>
          <Link href='/orders/order/123' className='relative w-[30px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] text-[24px] font-bold'>Theo dõi vị trí đơn hàng</h3>
        </div>

        <div>
          <h3>Khoảng cách và thời gian dự kiến:</h3>
          <p>
            📍 Shipper ➝ Restaurant: {distanceShipperToRestaurant.toFixed(2)} km (~ {timeShipperToRestaurant.toFixed(2)}{" "}
            giờ)
          </p>
          <p>
            🚀 Shipper ➝ Customer: {distanceShipperToCustomer.toFixed(2)} km (~ {timeShipperToCustomer.toFixed(2)} giờ)
          </p>
          <p>
            🍽 Restaurant ➝ Customer: {distanceRestaurantToCustomer.toFixed(2)} km (~{" "}
            {timeRestaurantToCustomer.toFixed(2)} giờ)
          </p>
        </div>

        <div className='w-full h-[500px] mt-4 relative z-0'>
          <MapContainer center={shipperLocation} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

            {/* Marker của shipper */}
            <Marker
              position={shipperLocation}
              icon={shipperIcon}
              eventHandlers={{ click: () => handleFlyToPosition(shipperLocation) }}
            ></Marker>

            {/* Marker của quán ăn */}
            <Marker
              position={restaurantLocation}
              icon={restaurantIcon}
              eventHandlers={{ click: () => handleFlyToPosition(restaurantLocation) }}
            ></Marker>

            {/* Marker của khách hàng */}
            <Marker
              position={customerLocation}
              icon={customerIcon}
              eventHandlers={{ click: () => handleFlyToPosition(customerLocation) }}
            ></Marker>

            {/* Đường đi của shipper */}
            <Polyline positions={path} color='blue' />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
