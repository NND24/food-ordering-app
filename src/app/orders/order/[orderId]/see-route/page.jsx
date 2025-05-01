"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../../../components/header/Header";
import Heading from "../../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
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
  const [routeToRestaurant, setRouteToRestaurant] = useState([]);
  const [routeToCustomer, setRouteToCustomer] = useState([]);
  const [distanceShipperToRestaurant, setDistanceShipperToRestaurant] = useState(0);
  const [distanceShipperToCustomer, setDistanceShipperToCustomer] = useState(0);
  const [distanceRestaurantToCustomer, setDistanceRestaurantToCustomer] = useState(0);
  const [timeShipperToRestaurant, setTimeShipperToRestaurant] = useState(0);
  const [timeShipperToCustomer, setTimeShipperToCustomer] = useState(0);
  const [timeRestaurantToCustomer, setTimeRestaurantToCustomer] = useState(0);

  const { data: orderDetail, refetch: refetchGetOrderDetail } = useGetOrderDetailQuery(orderId);

  useEffect(() => {
    refetchGetOrderDetail();
  }, []);

  console.log("orderDetail: ", orderDetail);

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

  // Lấy vị trí theo thời gian thực
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setShipperLocation(newLocation);
          const data = { lat: newLocation[0], lon: newLocation[1] };

          socket.emit("sendLocation", { id: orderId, data });
          console.log({ lat: newLocation[0], lon: newLocation[1] });
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Trình duyệt không hỗ trợ Geolocation");
    }
  }, []);

  // Lấy tuyến đường từ OSRM
  useEffect(() => {
    if (!shipperLocation) return;

    const fetchRoute = async (start, end, setRoute) => {
      try {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const coordinates = response.data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        setRoute(coordinates);
      } catch (error) {
        console.error("Lỗi lấy đường đi:", error);
      }
    };

    fetchRoute(shipperLocation, restaurantLocation, setRouteToRestaurant);
    fetchRoute(restaurantLocation, customerLocation, setRouteToCustomer);
  }, [shipperLocation]);

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
    <div className='pt-[85px] pb-[140px] md:pt-[75px] md:mt-[20px] md:px-0 bg-[#fff] md:bg-[#f9f9f9]'>
      <Heading title='Xem tuyến đường đi' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:rounded-[10px] md:shadow-md md:p-[20px]'>
        <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-2 bg-white h-[85px] px-4 md:static'>
          <Link href='/orders/order/123' className='relative w-[30px] pt-[30px]'>
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
          {shipperLocation && (
            <MapContainer center={shipperLocation} zoom={13} style={{ height: "500px", width: "100%" }} ref={mapRef}>
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              <Marker
                position={shipperLocation}
                icon={shipperIcon}
                eventHandlers={{ click: () => handleFlyToPosition(shipperLocation) }}
              />
              <Marker
                position={restaurantLocation}
                icon={restaurantIcon}
                eventHandlers={{ click: () => handleFlyToPosition(restaurantLocation) }}
              />
              <Marker
                position={customerLocation}
                icon={customerIcon}
                eventHandlers={{ click: () => handleFlyToPosition(customerLocation) }}
              />
              <Polyline positions={routeToRestaurant} color='blue' />
              <Polyline positions={routeToCustomer} color='red' />
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
