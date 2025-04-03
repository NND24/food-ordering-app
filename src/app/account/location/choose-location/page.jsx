"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../../../../context/LocationContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/619/619153.png",
  iconSize: [40, 40],
});

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

const ChangeView = ({ center, level }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, level);
  }, [center]);
  return null;
};

const Page = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const [dragMarkInput, setDragMarkInput] = useState("");
  const [province, setProvince] = useState({ name: "", lat: 200, lon: 200 });
  const [suggestions, setSuggestions] = useState([]);
  const [provinceSuggestions, setProvinceSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 200, lon: 200 });
  const [userLocation, setUserLocation] = useState({ lat: 200, lon: 200 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [openSelectProvince, setOpenSelectProvince] = useState(false);

  const { setLocation, location } = useLocation();

  const handleChooseLocation = (newLocation) => {
    setLocation(newLocation);
    router.back();
  };

  const fetchSuggestions = useCallback(
    debounce(async (query, province) => {
      if (!query) return;

      // Kiểm tra province trước khi sử dụng tọa độ
      const viewbox = province
        ? `${province.lon - 0.5},${province.lat + 0.5},${province.lon + 0.5},${province.lat - 0.5}`
        : "";

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}
          &format=json&addressdetails=1&countrycodes=VN&accept-language=vi${
            viewbox ? `&viewbox=${viewbox}&bounded=1` : ""
          }`;

      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent": "your-app-name",
          },
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        // Chuyển dữ liệu thành format mong muốn
        const suggestions = data.map((place) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lon: parseFloat(place.lon),
        }));

        setSuggestions(suggestions);
      } catch (error) {
        console.error("Fetch suggestions error:", error);
      }
    }, 2000),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSuggestions(value, province);
  };

  const handleSearchProvince = (e) => {
    const query = e.target.value;
    setSearchProvince(query);
    const filtered = provinces.filter((province) => province.name.toLowerCase().includes(query.toLowerCase()));
    setProvinceSuggestions(filtered);
  };

  const handleSelectLocation = (place) => {
    if (selectedLocation.lat === place.lat && selectedLocation.lon === place.lon) return;

    setSelectedLocation({ lat: place.lat, lon: place.lon });
    setSearch(place.name);
    setSuggestions([]);
  };

  const handleProvinceChange = (prov) => {
    setProvince(prov);
    setSelectedLocation({ lat: prov.lat, lon: prov.lon });
  };

  const MarkerComponent = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
      const marker = L.marker([lat, lon], { draggable: true }).addTo(map);
      marker.on("dragend", async (event) => {
        const { lat, lng } = event.target.getLatLng();
        setSelectedLocation({ lat, lon: lng });
      });
      return () => marker.remove();
    }, [lat, lon, map]);

    return null;
  };

  const fetchPlaceName = async (lon, lat) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}
        &format=json&addressdetails=1&accept-language=vi`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "your-app-name",
        },
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      // Lấy tên địa điểm từ display_name
      setDragMarkInput(data.display_name);
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };

  const getClosestProvince = ({ lat, lon }) => {
    const closestProvince = provinces.reduce((prev, curr) => {
      const prevDistance = Math.sqrt(Math.pow(prev.lat - lat, 2) + Math.pow(prev.lon - lon, 2));
      const currDistance = Math.sqrt(Math.pow(curr.lat - lat, 2) + Math.pow(curr.lon - lon, 2));
      return currDistance < prevDistance ? curr : prev;
    });
    return closestProvince;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          setUserLocation({ lat: userLat, lon: userLon });

          if (location.lat !== 200) {
            setSelectedLocation({ lat: location.lat, lon: location.lon });
            setProvince(getClosestProvince({ lat: location.lat, lon: location.lon }));
          } else {
            setSelectedLocation({ lat: userLat, lon: userLon });
            setProvince(getClosestProvince({ lat: userLat, lon: userLon }));
          }
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedLocation.lat !== 200) {
      fetchPlaceName(selectedLocation.lon, selectedLocation.lat);
    }
  }, [selectedLocation]);

  const MapZoomHandler = () => {
    const map = useMap();
    useEffect(() => {
      const handleZoomEnd = () => {
        setZoomLevel(map.getZoom());
      };

      map.on("zoomend", handleZoomEnd);

      return () => {
        map.off("zoomend", handleZoomEnd);
      };
    }, [map]);

    return null;
  };

  const timeoutRef = useRef(null);

  // Custom hook để bắt sự kiện trên bản đồ
  const MapEvents = () => {
    useMapEvents({
      mousedown: (event) => {
        timeoutRef.current = setTimeout(() => {
          const { lat, lng } = event.latlng;
          setSelectedLocation({ lat, lon: lng });
        }, 500); // Nhấn giữ 0.5s để đặt ghim
      },
      mouseup: () => {
        clearTimeout(timeoutRef.current); // Hủy nếu không đủ 500ms
      },
      mousemove: () => {
        clearTimeout(timeoutRef.current); // Hủy nếu di chuột đi chỗ khác
      },
    });

    return null;
  };

  return (
    <>
      {province.lat !== 200 && selectedLocation.lat !== 200 && userLocation.lat !== 200 && (
        <div className='pt-[85px] pb-[140px] md:pt-[75px] md:mt-[20px] md:px-0 md:bg-[#f9f9f9]'>
          <Heading title='Thêm địa chỉ' />
          <div className='hidden md:block'>
            <Header page='account' />
          </div>

          {!openSelectProvince ? (
            <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:rounded-[10px] md:shadow-md md:p-[20px]'>
              <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-2 bg-white h-[85px] px-4 md:static'>
                <div
                  onClick={() => {
                    router.back();
                  }}
                  className='relative w-[30px] pt-[30px] cursor-pointer'
                >
                  <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
                </div>

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
                      {suggestions.map((place, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectLocation(place)}
                          className='p-2 hover:bg-gray-200 cursor-pointer'
                        >
                          {place.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div
                  className='flex flex-col items-center gap-[4px]'
                  onClick={() => {
                    setOpenSelectProvince(true);
                    setSearchProvince(province.name);
                  }}
                >
                  <div className='p-[6px] bg-red-600 rounded-full'>
                    <div className='relative w-[15px] pt-[15px]'>
                      <Image src='/assets/star_yellow.png' alt='' layout='fill' objectFit='contain' />
                    </div>
                  </div>
                  <p className='text-[13px] text-[#4a4b4d] font-semibold'>{province.name}</p>
                </div>
              </div>

              {/* Map component */}
              <div className='w-full h-[500px] mt-4 relative z-0'>
                {typeof window !== "undefined" && (
                  <MapContainer
                    center={[selectedLocation.lat, selectedLocation.lon]}
                    zoom={zoomLevel}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ChangeView center={[selectedLocation.lat, selectedLocation.lon]} level={zoomLevel} />
                    <MapZoomHandler />
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    <MapEvents />

                    <MarkerComponent lat={selectedLocation.lat} lon={selectedLocation.lon} />
                    {/* Marker cố định tại vị trí hiện tại */}
                    {userLocation && (
                      <Marker
                        position={[userLocation.lat, userLocation.lon]}
                        icon={homeIcon}
                        eventHandlers={{
                          click: () => {
                            setSelectedLocation({ lat: userLocation.lat, lon: userLocation.lon });
                          },
                        }}
                      >
                        <Popup>Vị trí hiện tại</Popup>
                      </Marker>
                    )}

                    <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
                      <Popup>{dragMarkInput}</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>

              <div className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100]'>
                <div
                  className='flex items-center justify-center lg:w-[60%] md:w-[80%] md:mx-auto rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] w-full cursor-pointer'
                  onClick={() => {
                    handleChooseLocation({
                      address: dragMarkInput,
                      lat: selectedLocation.lat,
                      lon: selectedLocation.lon,
                    });
                  }}
                >
                  <span className='text-[#fff] text-[20px] font-semibold'>Chọn địa điểm này</span>
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:border md:rounded-[10px] md:shadow-md md:p-[20px]'>
              <div className='fixed top-0 right-0 left-0 z-10 flex items-center gap-2 bg-white h-[85px] px-4 md:static'>
                <div
                  className='relative w-[30px] pt-[30px]'
                  onClick={() => {
                    setOpenSelectProvince(false);
                    setProvinceSuggestions([]);
                  }}
                >
                  <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
                </div>

                <div className='relative flex-1'>
                  <input
                    type='text'
                    placeholder='Nhập tỉnh'
                    value={searchProvince}
                    onChange={handleSearchProvince}
                    className='w-full bg-gray-200 text-lg p-2 rounded-lg'
                  />
                  {provinceSuggestions.length > 0 && (
                    <ul className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-50 max-h-60 overflow-auto shadow-lg'>
                      {provinceSuggestions.map((prov) => (
                        <li
                          key={prov.name}
                          onClick={() => {
                            setOpenSelectProvince(false);
                            handleProvinceChange(prov);
                            setProvinceSuggestions([]);
                          }}
                          className='p-2 hover:bg-gray-200 cursor-pointer'
                        >
                          {prov.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className='flex flex-col items-center gap-[4px]'>
                  <div className='p-[6px] bg-red-600 rounded-full'>
                    <div className='relative w-[15px] pt-[15px]'>
                      <Image src='/assets/star_yellow.png' alt='' layout='fill' objectFit='contain' />
                    </div>
                  </div>
                  <p className='text-[13px] text-[#4a4b4d] font-semibold'>{province.name}</p>
                </div>
              </div>

              <div className='w-full h-[500px] mt-4 relative z-0'>
                {provinces.map((prov) => (
                  <div
                    key={prov.name}
                    onClick={() => {
                      setOpenSelectProvince(false);
                      handleProvinceChange(prov);
                      setProvinceSuggestions([]);
                    }}
                    className={`py-[15px] px-[20px] cursor-pointer ${
                      prov.name === province.name ? "bg-[#a3a3a3a3]" : "bg-[#fff]"
                    }`}
                    style={{ borderBottom: "1px solid #e0e0e0a3" }}
                  >
                    <span className='text-[#4a4b4d] font-bold'>{prov.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
