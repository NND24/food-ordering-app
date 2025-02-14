"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import debounce from "lodash.debounce";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1Ijoibm5kMjQiLCJhIjoiY202enowM2EwMGFuajJscHAydWR2djNwZyJ9.aehiGV68lQ1FngcvaSA6ow";

const provinces = [
  { name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { name: "TP. Hồ Chí Minh", lat: 10.762622, lon: 106.660172 },
  { name: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
  { name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
  { name: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
  { name: "Bình Dương", lat: 11.3257, lon: 106.477 },
  { name: "Đồng Nai", lat: 10.9453, lon: 106.824 },
  { name: "Khánh Hòa", lat: 12.2388, lon: 109.196 },
  { name: "Lâm Đồng", lat: 11.9404, lon: 108.458 },
  { name: "Quảng Ninh", lat: 20.9688, lon: 107.044 },
  { name: "Thanh Hóa", lat: 19.8066, lon: 105.785 },
  { name: "Nghệ An", lat: 18.6765, lon: 105.681 },
  { name: "Thừa Thiên Huế", lat: 16.4637, lon: 107.5909 },
  { name: "An Giang", lat: 10.5106, lon: 105.4533 },
  { name: "Bà Rịa-Vũng Tàu", lat: 10.5553, lon: 107.2376 },
  { name: "Bắc Giang", lat: 21.2723, lon: 106.2011 },
  { name: "Bắc Kạn", lat: 22.1761, lon: 105.8604 },
  { name: "Bạc Liêu", lat: 9.2887, lon: 105.7103 },
  { name: "Bắc Ninh", lat: 21.1857, lon: 106.0847 },
  { name: "Bến Tre", lat: 10.2417, lon: 106.3749 },
  { name: "Bình Định", lat: 13.0532, lon: 109.1957 },
  { name: "Bình Phước", lat: 11.5948, lon: 106.9891 },
  { name: "Bình Thuận", lat: 10.9314, lon: 108.0967 },
  { name: "Cao Bằng", lat: 22.6617, lon: 106.2589 },
  { name: "Cà Mau", lat: 9.175, lon: 105.1504 },
  { name: "Đắk Lắk", lat: 12.648, lon: 108.1884 },
  { name: "Đắk Nông", lat: 12.0011, lon: 107.9932 },
  { name: "Điện Biên", lat: 21.0041, lon: 103.0207 },
  { name: "Đồng Tháp", lat: 10.4538, lon: 105.7508 },
  { name: "Gia Lai", lat: 13.992, lon: 108.0785 },
  { name: "Hà Giang", lat: 22.7783, lon: 104.9884 },
  { name: "Hà Nam", lat: 20.5642, lon: 105.9146 },
  { name: "Hà Tĩnh", lat: 18.3383, lon: 105.9095 },
  { name: "Hòa Bình", lat: 20.8027, lon: 105.3432 },
  { name: "Hưng Yên", lat: 20.7953, lon: 106.0599 },
  { name: "Hậu Giang", lat: 9.7788, lon: 105.309 },
  { name: "Kiên Giang", lat: 10.0115, lon: 104.4892 },
  { name: "Kon Tum", lat: 14.353, lon: 108.0215 },
  { name: "Lai Châu", lat: 22.3478, lon: 103.9232 },
  { name: "Lạng Sơn", lat: 21.8457, lon: 106.7048 },
  { name: "Lào Cai", lat: 22.4303, lon: 103.9501 },
  { name: "Long An", lat: 10.3886, lon: 106.4371 },
  { name: "Nam Định", lat: 20.4167, lon: 106.1667 },
  { name: "Ninh Bình", lat: 20.2583, lon: 105.9718 },
  { name: "Ninh Thuận", lat: 11.5751, lon: 108.9181 },
  { name: "Phú Thọ", lat: 21.3195, lon: 105.1868 },
  { name: "Phú Yên", lat: 13.0908, lon: 109.1951 },
  { name: "Quảng Bình", lat: 17.4776, lon: 106.5863 },
  { name: "Quảng Nam", lat: 15.5674, lon: 108.1871 },
  { name: "Quảng Ngãi", lat: 15.1037, lon: 108.8019 },
  { name: "Quảng Trị", lat: 16.762, lon: 107.5762 },
  { name: "Sóc Trăng", lat: 9.5943, lon: 105.9527 },
  { name: "Sơn La", lat: 21.3122, lon: 103.9092 },
  { name: "Tây Ninh", lat: 11.3567, lon: 106.1392 },
  { name: "Thái Bình", lat: 20.4458, lon: 106.3321 },
  { name: "Thái Nguyên", lat: 21.5933, lon: 105.8538 },
  { name: "TP. Đà Lạt", lat: 11.9404, lon: 108.458 },
  { name: "Tiền Giang", lat: 10.4535, lon: 106.3423 },
  { name: "Trà Vinh", lat: 9.9334, lon: 106.327 },
  { name: "Tuyên Quang", lat: 21.8234, lon: 105.2615 },
  { name: "Vĩnh Long", lat: 10.2537, lon: 105.9714 },
  { name: "Vĩnh Phúc", lat: 21.3573, lon: 105.543 },
  { name: "Yên Bái", lat: 21.7335, lon: 104.8598 },
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [dragMarkInput, setDragMarkInput] = useState("");
  const [province, setProvince] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Hàm debounce tìm kiếm
  const fetchSuggestions = useCallback(
    debounce(async (query, province) => {
      if (!query) return;

      const foundProvince = provinces.find((prov) => prov.name === province);
      if (!foundProvince) return;

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?` +
          `access_token=${mapboxgl.accessToken}&language=vi` +
          `&proximity=${foundProvince.lon},${foundProvince.lat}&country=VN` +
          `&autocomplete=true`
      );

      const data = await res.json();
      setSuggestions(data.features);
    }, 2000),
    []
  );

  // Xử lý nhập tìm kiếm
  const handleSearchChange = useCallback(
    debounce((e) => {
      const value = e.target.value;
      setSearch(value);
      fetchSuggestions(value, province);
    }, 500),
    [province]
  );

  // Xử lý chọn địa điểm từ gợi ý
  const handleSelectLocation = async (place) => {
    const [lon, lat] = place.center;
    if (selectedLocation.lat === lat && selectedLocation.lon === lon) return; // Nếu không thay đổi thì không cần làm gì

    setSelectedLocation({ lat, lon });
    setSearch(place.place_name);
    setSuggestions([]);

    if (marker.current) marker.current.remove();

    marker.current = new mapboxgl.Marker({ color: "red" }).setLngLat([lon, lat]).addTo(map.current);
    marker.current.on("dragend", handleMarkerDrag);
    map.current.flyTo({ center: [lon, lat], zoom: 12 });
  };

  // Khi thay đổi tỉnh, cập nhật vị trí trên bản đồ
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    const foundProvince = provinces.find((prov) => prov.name === selectedProvince);
    if (foundProvince) {
      setSelectedLocation({ lat: foundProvince.lat, lon: foundProvince.lon });

      // Xóa marker cũ
      if (marker.current) marker.current.remove();

      // Thêm marker mới cho tỉnh đã chọn
      map.current.on("load", () => {
        marker.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([foundProvince.lon, foundProvince.lat])
          .setDraggable(true)
          .addTo(map.current);
      });

      // Handle marker drag event to update the position
      marker.current.on("dragend", handleMarkerDrag);

      // Di chuyển bản đồ tới vị trí của tỉnh
      map.current.flyTo({ center: [foundProvince.lon, foundProvince.lat], zoom: 12 });
    }
  };

  const handleMarkerDrag = debounce(async () => {
    const lngLat = marker.current.getLngLat();
    setSelectedLocation({ lat: lngLat.lat, lon: lngLat.lng });

    // Gọi API để lấy thông tin địa điểm từ tọa độ
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?` +
          `access_token=${mapboxgl.accessToken}&language=vi`
      );
      const data = await res.json();
      console.log(data);

      if (data.features.length > 0) {
        const placeName = data.features[0].place_name;
        setDragMarkInput(placeName);
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin địa điểm:", error);
    }
  }, 2000);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          // Find the closest province based on the user's current location
          const closestProvince = provinces.reduce((prev, curr) => {
            const prevDistance = Math.sqrt(Math.pow(prev.lat - userLat, 2) + Math.pow(prev.lon - userLon, 2));
            const currDistance = Math.sqrt(Math.pow(curr.lat - userLat, 2) + Math.pow(curr.lon - userLon, 2));
            return currDistance < prevDistance ? curr : prev;
          });

          // Set the province based on the closest province
          setProvince(closestProvince.name);
          setSelectedLocation({ lat: userLat, lon: userLon });

          try {
            const res = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLon},${userLat}.json?` +
                `access_token=${mapboxgl.accessToken}&language=vi`
            );
            const data = await res.json();
            if (data.features.length > 0) {
              const placeName = data.features[0].place_name;
              setDragMarkInput(placeName);
            }
          } catch (error) {
            console.error("Lỗi lấy thông tin địa điểm:", error);
          }

          // Initialize the map
          if (!map.current) {
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: [userLon, userLat],
              zoom: 16,
            });

            // Create a draggable marker
            map.current.on("load", () => {
              // Xóa marker cũ nếu có
              if (marker.current) marker.current.remove();

              // Thêm marker mới
              marker.current = new mapboxgl.Marker({ color: "red" })
                .setLngLat([userLon, userLat])
                .setDraggable(true)
                .addTo(map.current);

              // Handle marker drag event to update the position
              marker.current.on("dragend", handleMarkerDrag);
            });
          } else {
            map.current.flyTo({ center: [userLon, userLat], zoom: 16 });
          }
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  // Khởi tạo bản đồ
  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!map.current || !selectedLocation.lat || !selectedLocation.lon) return;

    if (marker.current) {
      marker.current.setLngLat([selectedLocation.lon, selectedLocation.lat]);
    } else {
      marker.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([selectedLocation.lon, selectedLocation.lat])
        .setDraggable(true)
        .addTo(map.current);

      marker.current.on("dragend", handleMarkerDrag);
    }

    map.current.flyTo({ center: [selectedLocation.lon, selectedLocation.lat], zoom: 16 });
  }, [selectedLocation]);

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

          <div className='relative flex-1'>
            <input
              type='text'
              value={search}
              onChange={handleSearchChange}
              placeholder='Nhập địa điểm'
              className='w-full bg-gray-200 text-lg p-2 rounded-lg'
            />
            {suggestions.length > 0 && (
              <ul className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-50 max-h-60 overflow-auto shadow-lg'>
                {suggestions.map((place) => (
                  <li
                    key={place.id}
                    onClick={() => handleSelectLocation(place)}
                    className='p-2 hover:bg-gray-200 cursor-pointer'
                  >
                    {place.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            value={province}
            onChange={handleProvinceChange}
            className='bg-gray-200 text-lg p-2 rounded-lg border border-gray-400'
          >
            {provinces.map((prov) => (
              <option key={prov.name} value={prov.name}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full h-[500px] mt-4 relative'>
          <div ref={mapContainer} className='absolute top-0 left-0 w-full h-full' />
        </div>
        <input
          type='text'
          value={dragMarkInput}
          onChange={(e) => {
            setDragMarkInput(e.target.value);
          }}
          placeholder='Hiển thị vị trí hiện tại'
          className='w-full bg-gray-200 text-lg p-2 rounded-lg mt-[20px]'
        />
      </div>
    </div>
  );
};

export default Page;
