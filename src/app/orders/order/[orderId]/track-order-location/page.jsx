"use client";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { haversineDistance, calculateTravelTime } from "../../../../../utils/functions";
import { useSocket } from "../../../../../context/SocketContext";
import { useParams } from "next/navigation";
import { useGetOrderDetailQuery } from "../../../../../redux/features/order/orderApi";

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
  const { socket } = useSocket();
  const { orderId } = useParams();

  const [shipperLocation, setShipperLocation] = useState([10.762622, 106.660172]);
  const [restaurantLocation, setRestaurantLocation] = useState([10.762622, 106.660172]);
  const [customerLocation, setCustomerLocation] = useState([10.762622, 106.660172]);
  const [distanceShipperToRestaurant, setDistanceShipperToRestaurant] = useState(0);
  const [distanceShipperToCustomer, setDistanceShipperToCustomer] = useState(0);
  const [distanceRestaurantToCustomer, setDistanceRestaurantToCustomer] = useState(0);
  const [timeShipperToRestaurant, setTimeShipperToRestaurant] = useState(0);
  const [timeShipperToCustomer, setTimeShipperToCustomer] = useState(0);
  const [timeRestaurantToCustomer, setTimeRestaurantToCustomer] = useState(0);
  const [path, setPath] = useState([]); // Đường đi của shipper

  const { data: orderDetail, refetch: refetchGetOrderDetail } = useGetOrderDetailQuery(orderId);

  useEffect(() => {
    refetchGetOrderDetail();
  }, []);

  useEffect(() => {
    if (!socket || !orderId) return;

    socket.emit("joinOrder", orderId);

    return () => {
      socket.emit("leaveOrder", orderId);
    };
  }, [socket, orderId]);

  useEffect(() => {
    if (orderDetail) {
      setRestaurantLocation([orderDetail.data.store.address.lat, orderDetail.data.store.address.lon]);
      setCustomerLocation([orderDetail.data.shipLocation.coordinates[1], orderDetail.data.shipLocation.coordinates[0]]);
    }
  }, [orderDetail]);

  useEffect(() => {
    socket.on("updateLocation", (data) => {
      setShipperLocation([data.lat, data.lon]);
      setPath((prevPath) => [...prevPath, [data.lat, data.lon]]);
    });

    return () => {
      socket.off("updateLocation");
    };
  }, []);

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
          <Link href={`/orders/order/${orderId}`} className='relative w-[30px] pt-[30px]'>
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
