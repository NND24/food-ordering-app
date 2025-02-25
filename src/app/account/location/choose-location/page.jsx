"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../../../components/header/Header";
import Heading from "../../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import mapboxgl from "mapbox-gl";
import { useLocation } from "../../../../context/LocationContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN;

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
  const [poiData, setPoiData] = useState([]);
  const [nearestPOI, setNearestPOI] = useState(null);
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

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?` +
          `access_token=${mapboxgl.accessToken}&language=vi` +
          `&proximity=${province.lon},${province.lat}&country=VN` +
          `&fuzzyMatch=true`
      );

      const data = await res.json();
      setSuggestions(data.features);
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
    const [lon, lat] = place.center;
    if (selectedLocation.lat === lat && selectedLocation.lon === lon) return;

    setSelectedLocation({ lat, lon });
    setSearch(place.place_name);
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
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?` +
        `access_token=${mapboxgl.accessToken}&language=vi&country=VN`
    );
    const data = await res.json();
    if (data.features.length > 0) {
      setDragMarkInput(data.features[1].place_name);
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

  // Icon POI theo loại
  const icons = {
    school: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2602/2602414.png", iconSize: [15, 15] }),
    hospital: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4320/4320371.png", iconSize: [15, 15] }),
    restaurant: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1689/1689246.png", iconSize: [15, 15] }),
    cafe: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4721/4721028.png", iconSize: [15, 15] }),
    bar: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3321/3321578.png", iconSize: [15, 15] }),
    bank: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2830/2830284.png", iconSize: [15, 15] }),
    post_office: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3269/3269420.png", iconSize: [15, 15] }),
    library: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9043/9043296.png", iconSize: [15, 15] }),
    place_of_worship: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/14464/14464728.png",
      iconSize: [15, 15],
    }),
    telephone: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4814/4814446.png", iconSize: [15, 15] }),
    fire_station: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/11210/11210082.png",
      iconSize: [15, 15],
    }),
    fast_food: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/737/737967.png", iconSize: [15, 15] }),
    fuel: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/465/465039.png", iconSize: [15, 15] }),
    parking: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/15561/15561506.png", iconSize: [15, 15] }),
    pharmacy: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9069/9069025.png", iconSize: [15, 15] }),
    university: new L.Icon({ iconUrl: "university", iconSize: [15, 15] }),
    dentist: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3467/3467830.png", iconSize: [15, 15] }),
    doctor: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3952/3952988.png", iconSize: [15, 15] }),
    nursing_home: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/4850/4850811.png",
      iconSize: [15, 15],
    }),
    bicycle_parking: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3005/3005600.png",
      iconSize: [15, 15],
    }),
    swimming_pool: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/1925/1925866.png",
      iconSize: [15, 15],
    }),
    sports_centre: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/12997/12997502.png",
      iconSize: [15, 15],
    }),
    public_building: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/2942/2942585.png",
      iconSize: [15, 15],
    }),
    supermarket: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3361/3361342.png", iconSize: [15, 15] }),
    mall: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4578/4578246.png", iconSize: [15, 15] }),
    convenience: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/11790/11790581.png",
      iconSize: [15, 15],
    }),
    bakery: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9102/9102700.png", iconSize: [15, 15] }),
    butcher: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2403/2403225.png", iconSize: [15, 15] }),
    clothes: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7845/7845240.png", iconSize: [15, 15] }),
    shoe: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/6500/6500128.png", iconSize: [15, 15] }),
    electronics: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3028/3028580.png", iconSize: [15, 15] }),
    jewelry: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3361/3361214.png", iconSize: [15, 15] }),
    hardware: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2544/2544981.png", iconSize: [15, 15] }),
    book: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7657/7657441.png", iconSize: [15, 15] }),
    chemist: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4011/4011657.png", iconSize: [15, 15] }),
    pet: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/6915/6915554.png", iconSize: [15, 15] }),
    furniture: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3361/3361483.png", iconSize: [15, 15] }),
    toy: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2069/2069534.png", iconSize: [15, 15] }),
    music: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4786/4786459.png", iconSize: [15, 15] }),
    gift: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7845/7845223.png", iconSize: [15, 15] }),
    garden_centre: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3812/3812836.png",
      iconSize: [15, 15],
    }),
    florist: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3361/3361221.png", iconSize: [15, 15] }),
    wine: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7845/7845943.png", iconSize: [15, 15] }),
    car: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3361/3361506.png", iconSize: [15, 15] }),
    bicycle: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3028/3028555.png", iconSize: [15, 15] }),
    optician: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5222/5222822.png", iconSize: [15, 15] }),
    kiosk: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2138/2138770.png", iconSize: [15, 15] }),
    stationery: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/14786/14786192.png",
      iconSize: [15, 15],
    }),
    art: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3028/3028606.png", iconSize: [15, 15] }),
    cosmetics: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7846/7846111.png", iconSize: [15, 15] }),
    park: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2169/2169407.png", iconSize: [15, 15] }),
    playground: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5599/5599373.png", iconSize: [15, 15] }),
    fitness_centre: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/7159/7159784.png",
      iconSize: [15, 15],
    }),
    golf_course: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4283/4283671.png", iconSize: [15, 15] }),
    stadium: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1259/1259792.png", iconSize: [15, 15] }),
    beach: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3722/3722618.png", iconSize: [15, 15] }),
    track: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3088/3088999.png", iconSize: [15, 15] }),
    summer_camp: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1020/1020535.png", iconSize: [15, 15] }),
    nature_reserve: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/15408/15408930.png",
      iconSize: [15, 15],
    }),
    water_park: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5273/5273675.png", iconSize: [15, 15] }),
    marina: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4841/4841998.png", iconSize: [15, 15] }),
    billiard_hall: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/536/536063.png", iconSize: [15, 15] }),
    bowling_alley: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3390/3390709.png",
      iconSize: [15, 15],
    }),
    arcade: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/550/550483.png", iconSize: [15, 15] }),
    camp_site: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/14956/14956395.png", iconSize: [15, 15] }),
    theme_park: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/8149/8149401.png", iconSize: [15, 15] }),
    amusement_arcade: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/5727/5727875.png",
      iconSize: [15, 15],
    }),
    hotel: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3009/3009489.png", iconSize: [15, 15] }),
    motel: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4318/4318538.png", iconSize: [15, 15] }),
    guest_house: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1476/1476071.png", iconSize: [15, 15] }),
    hostel: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/10607/10607354.png", iconSize: [15, 15] }),
    chalet: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3056/3056304.png", iconSize: [15, 15] }),
    tourist_attraction: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/16999/16999298.png",
      iconSize: [15, 15],
    }),
    museum: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5754/5754055.png", iconSize: [15, 15] }),
    artwork: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3474/3474521.png", iconSize: [15, 15] }),
    viewpoint: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/8080/8080762.png", iconSize: [15, 15] }),
    zoo: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4300/4300067.png", iconSize: [15, 15] }),
    aquarium: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1675/1675814.png", iconSize: [15, 15] }),
    amusement_park: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/7385/7385434.png",
      iconSize: [15, 15],
    }),
    world_heritage: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/6254/6254078.png",
      iconSize: [15, 15],
    }),
    memorial: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/10644/10644003.png", iconSize: [15, 15] }),
    monument: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/553/553968.png", iconSize: [15, 15] }),
    castle: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/619/619097.png", iconSize: [15, 15] }),
    camp_site: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/14956/14956395.png", iconSize: [15, 15] }),
    archaeological_site: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/6739/6739537.png",
      iconSize: [15, 15],
    }),
    ruins: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2318/2318430.png", iconSize: [15, 15] }),
    pyramid: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2195/2195550.png", iconSize: [15, 15] }),
    platform: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3267/3267610.png", iconSize: [15, 15] }),
    stop: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3477/3477145.png", iconSize: [15, 15] }),
    bus_stop: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1042/1042263.png", iconSize: [15, 15] }),
    tram_stop: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4325/4325922.png", iconSize: [15, 15] }),
    railway_station: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/2062/2062051.png",
      iconSize: [15, 15],
    }),
    subway_station: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/7366/7366386.png",
      iconSize: [15, 15],
    }),
    ferry_terminal: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/18783/18783414.png",
      iconSize: [15, 15],
    }),
    waterway_terminal: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/10278/10278362.png",
      iconSize: [15, 15],
    }),
    apartments: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9428/9428333.png", iconSize: [15, 15] }),
    commercial: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2145/2145486.png", iconSize: [15, 15] }),
    industrial: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3256/3256216.png", iconSize: [15, 15] }),
    church: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3656/3656972.png", iconSize: [15, 15] }),
    warehouse: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3061/3061160.png", iconSize: [15, 15] }),
    office: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1584/1584961.png", iconSize: [15, 15] }),
    military: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/7445/7445197.png", iconSize: [15, 15] }),
    shopping: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3081/3081648.png", iconSize: [15, 15] }),
    fort: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5015/5015482.png", iconSize: [15, 15] }),
    wall: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/698/698633.png", iconSize: [15, 15] }),
    battlefield: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/11348/11348063.png",
      iconSize: [15, 15],
    }),
    rock: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5137/5137708.png", iconSize: [15, 15] }),
    heritage: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/5234/5234710.png", iconSize: [15, 15] }),
    tomb: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/252/252129.png", iconSize: [15, 15] }),
    fountain: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2653/2653272.png", iconSize: [15, 15] }),
    government: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/6715/6715844.png", iconSize: [15, 15] }),
    company: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4300/4300059.png", iconSize: [15, 15] }),
    financial: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3707/3707944.png", iconSize: [15, 15] }),
    insurance: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/15540/15540115.png", iconSize: [15, 15] }),
    real_estate: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2440/2440098.png", iconSize: [15, 15] }),
    lawyer: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2838/2838113.png", iconSize: [15, 15] }),
    accountant: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/1669/1669668.png", iconSize: [15, 15] }),
    architect: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/10365/10365944.png", iconSize: [15, 15] }),
    media: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/3758/3758634.png", iconSize: [15, 15] }),
    research: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4148/4148586.png", iconSize: [15, 15] }),
    nonprofit: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/4964/4964004.png", iconSize: [15, 15] }),
    politician: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2718/2718130.png", iconSize: [15, 15] }),
    clinic: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/169/169869.png", iconSize: [15, 15] }),
    veterinary: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2365/2365014.png", iconSize: [15, 15] }),
    blood_donor: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2061/2061480.png", iconSize: [15, 15] }),
    health_centre: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3097/3097911.png",
      iconSize: [15, 15],
    }),
    rehabilitation: new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/11255/11255773.png",
      iconSize: [15, 15],
    }),
    diagnostic: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/2804/2804895.png", iconSize: [15, 15] }),
    default: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9759/9759266.png", iconSize: [25, 25] }),
  };

  // Lấy icon phù hợp với POI
  const getIconForPOI = (poi) => {
    if (poi.tags.amenity === "school") return icons.school;
    if (poi.tags.amenity === "hospital") return icons.hospital;
    if (poi.tags.amenity === "restaurant") return icons.restaurant;
    if (poi.tags.amenity === "cafe") return icons.cafe;
    if (poi.tags.amenity === "bar") return icons.bar;
    if (poi.tags.amenity === "bank") return icons.bank;
    if (poi.tags.amenity === "post_office") return icons.post_office;
    if (poi.tags.amenity === "library") return icons.library;
    if (poi.tags.amenity === "place_of_worship") return icons.place_of_worship;
    if (poi.tags.amenity === "telephone") return icons.telephone;
    if (poi.tags.amenity === "fire_station") return icons.fire_station;
    if (poi.tags.amenity === "fast_food") return icons.fast_food;
    if (poi.tags.amenity === "fuel") return icons.fuel;
    if (poi.tags.amenity === "parking") return icons.parking;
    if (poi.tags.amenity === "pharmacy") return icons.pharmacy;
    if (poi.tags.amenity === "university") return icons.university;
    if (poi.tags.amenity === "dentist") return icons.dentist;
    if (poi.tags.amenity === "doctor") return icons.doctor;
    if (poi.tags.amenity === "nursing_home") return icons.nursing_home;
    if (poi.tags.amenity === "bicycle_parking") return icons.bicycle_parking;
    if (poi.tags.amenity === "swimming_pool") return icons.swimming_pool;
    if (poi.tags.amenity === "sports_centre") return icons.sports_centre;
    if (poi.tags.amenity === "public_building") return icons.public_building;
    if (poi.tags.shop === "supermarket") return icons.supermarket;
    if (poi.tags.shop === "mall") return icons.mall;
    if (poi.tags.shop === "convenience") return icons.convenience;
    if (poi.tags.shop === "bakery") return icons.bakery;
    if (poi.tags.shop === "butcher") return icons.butcher;
    if (poi.tags.shop === "clothes") return icons.clothes;
    if (poi.tags.shop === "shoe") return icons.shoe;
    if (poi.tags.shop === "electronics") return icons.electronics;
    if (poi.tags.shop === "jewelry") return icons.jewelry;
    if (poi.tags.shop === "hardware") return icons.hardware;
    if (poi.tags.shop === "book") return icons.book;
    if (poi.tags.shop === "chemist") return icons.chemist;
    if (poi.tags.shop === "pet") return icons.pet;
    if (poi.tags.shop === "furniture") return icons.furniture;
    if (poi.tags.shop === "toy") return icons.toy;
    if (poi.tags.shop === "music") return icons.music;
    if (poi.tags.shop === "gift") return icons.gift;
    if (poi.tags.shop === "garden_centre") return icons.garden_centre;
    if (poi.tags.shop === "florist") return icons.florist;
    if (poi.tags.shop === "wine") return icons.wine;
    if (poi.tags.shop === "car") return icons.car;
    if (poi.tags.shop === "bicycle") return icons.bicycle;
    if (poi.tags.shop === "optician") return icons.optician;
    if (poi.tags.shop === "kiosk") return icons.kiosk;
    if (poi.tags.shop === "stationery") return icons.stationery;
    if (poi.tags.shop === "art") return icons.art;
    if (poi.tags.shop === "cosmetics") return icons.cosmetics;
    if (poi.tags.leisure === "park") return icons.park;
    if (poi.tags.leisure === "playground") return icons.playground;
    if (poi.tags.leisure === "sports_centre") return icons.sports_centre;
    if (poi.tags.leisure === "fitness_centre") return icons.fitness_centre;
    if (poi.tags.leisure === "golf_course") return icons.golf_course;
    if (poi.tags.leisure === "stadium") return icons.stadium;
    if (poi.tags.leisure === "beach") return icons.beach;
    if (poi.tags.leisure === "track") return icons.track;
    if (poi.tags.leisure === "summer_camp") return icons.summer_camp;
    if (poi.tags.leisure === "nature_reserve") return icons.nature_reserve;
    if (poi.tags.leisure === "water_park") return icons.water_park;
    if (poi.tags.leisure === "marina") return icons.marina;
    if (poi.tags.leisure === "billiard_hall") return icons.billiard_hall;
    if (poi.tags.leisure === "bowling_alley") return icons.bowling_alley;
    if (poi.tags.leisure === "arcade") return icons.arcade;
    if (poi.tags.leisure === "camp_site") return icons.camp_site;
    if (poi.tags.leisure === "theme_park") return icons.theme_park;
    if (poi.tags.leisure === "amusement_arcade") return icons.amusement_arcade;
    if (poi.tags.tourism === "hotel") return icons.hotel;
    if (poi.tags.tourism === "motel") return icons.motel;
    if (poi.tags.tourism === "guest_house") return icons.guest_house;
    if (poi.tags.tourism === "hostel") return icons.hostel;
    if (poi.tags.tourism === "chalet") return icons.chalet;
    if (poi.tags.tourism === "tourist_attraction") return icons.tourist_attraction;
    if (poi.tags.tourism === "museum") return icons.museum;
    if (poi.tags.tourism === "artwork") return icons.artwork;
    if (poi.tags.tourism === "viewpoint") return icons.viewpoint;
    if (poi.tags.tourism === "zoo") return icons.zoo;
    if (poi.tags.tourism === "aquarium") return icons.aquarium;
    if (poi.tags.tourism === "amusement_park") return icons.amusement_park;
    if (poi.tags.tourism === "world_heritage") return icons.world_heritage;
    if (poi.tags.tourism === "memorial") return icons.memorial;
    if (poi.tags.tourism === "monument") return icons.monument;
    if (poi.tags.tourism === "castle") return icons.castle;
    if (poi.tags.tourism === "archaeological_site") return icons.archaeological_site;
    if (poi.tags.tourism === "ruins") return icons.ruins;
    if (poi.tags.tourism === "pyramid") return icons.pyramid;
    if (poi.tags.public_transport === "platform") return icons.platform;
    if (poi.tags.public_transport === "stop") return icons.stop;
    if (poi.tags.public_transport === "bus_stop") return icons.bus_stop;
    if (poi.tags.public_transport === "tram_stop") return icons.tram_stop;
    if (poi.tags.public_transport === "railway_station") return icons.railway_station;
    if (poi.tags.public_transport === "subway_station") return icons.subway_station;
    if (poi.tags.public_transport === "ferry_terminal") return icons.ferry_terminal;
    if (poi.tags.public_transport === "waterway_terminal") return icons.waterway_terminal;
    if (poi.tags.building === "apartments") return icons.apartments;
    if (poi.tags.building === "commercial") return icons.commercial;
    if (poi.tags.building === "industrial") return icons.industrial;
    if (poi.tags.building === "church") return icons.church;
    if (poi.tags.building === "warehouse") return icons.warehouse;
    if (poi.tags.building === "office") return icons.office;
    if (poi.tags.building === "military") return icons.military;
    if (poi.tags.building === "shopping") return icons.shopping;
    if (poi.tags.historic === "fort") return icons.fort;
    if (poi.tags.historic === "wall") return icons.wall;
    if (poi.tags.historic === "battlefield") return icons.battlefield;
    if (poi.tags.historic === "rock") return icons.rock;
    if (poi.tags.historic === "heritage") return icons.heritage;
    if (poi.tags.historic === "tomb") return icons.tomb;
    if (poi.tags.historic === "fountain") return icons.fountain;
    if (poi.tags.office === "government") return icons.government;
    if (poi.tags.office === "company") return icons.company;
    if (poi.tags.office === "financial") return icons.financial;
    if (poi.tags.office === "insurance") return icons.insurance;
    if (poi.tags.office === "real_estate") return icons.real_estate;
    if (poi.tags.office === "lawyer") return icons.lawyer;
    if (poi.tags.office === "accountant") return icons.accountant;
    if (poi.tags.office === "architect") return icons.architect;
    if (poi.tags.office === "consultant") return icons.consultant;
    if (poi.tags.office === "media") return icons.media;
    if (poi.tags.office === "research") return icons.research;
    if (poi.tags.office === "nonprofit") return icons.nonprofit;
    if (poi.tags.office === "politician") return icons.politician;
    if (poi.tags.healthcare === "clinic") return icons.clinic;
    if (poi.tags.healthcare === "veterinary") return icons.veterinary;
    if (poi.tags.healthcare === "blood_donor") return icons.blood_donor;
    if (poi.tags.healthcare === "health_centre") return icons.health_centre;
    if (poi.tags.healthcare === "rehabilitation") return icons.rehabilitation;
    if (poi.tags.healthcare === "diagnostic") return icons.diagnostic;
    return icons.default;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Bán kính Trái Đất (m)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Hàm lấy POI từ Overpass API
  const fetchPOIData = () => {
    const overpassURL = `
    https://overpass-api.de/api/interpreter?data=[out:json];
    (
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["amenity"~"school|hospital|restaurant|cafe|bar|bank|post_office|library|place_of_worship|telephone|fire_station|fast_food|fuel|parking|pharmacy|university|dentist|doctor|nursing_home|bicycle_parking|swimming_pool|sports_centre|public_building"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["shop"~"supermarket|mall|convenience|bakery|butcher|clothes|shoe|electronics|jewelry|hardware|book|chemist|pet|furniture|toy|music|gift|garden_centre|florist|wine|car|bicycle|optician|kiosk|stationery|art|cosmetics"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["leisure"~"park|playground|sports_centre|fitness_centre|golf_course|stadium|beach|track|summer_camp|nature_reserve|water_park|marina|billiard_hall|bowling_alley|arcade|camp_site|theme_park|amusement_arcade"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["tourism"~"hotel|motel|guest_house|hostel|chalet|tourist_attraction|museum|artwork|viewpoint|information|zoo|aquarium|amusement_park|world_heritage|memorial|monument|castle|archaeological_site|ruins|pyramid"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["public_transport"~"platform|station|stop|bus_stop|tram_stop|railway_station|subway_station|ferry_terminal|waterway_terminal"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["building"~"apartments|commercial|industrial|church|warehouse|office|military|shopping"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["historic"~"fort|wall|battlefield|rock|heritage|tomb|fountain"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["office"~"government|company|financial|insurance|real_estate|lawyer|accountant|architect|consultant|media|research|nonprofit|politician"];
      node(around:1000, ${selectedLocation.lat}, ${selectedLocation.lon})["healthcare"~"clinic|veterinary|blood_donor|health_centre|rehabilitation|diagnostic"];
    );
    out center;
  `;

    fetch(overpassURL)
      .then((res) => res.json())
      .then((data) => {
        if (data.elements) {
          // Lọc POI trong khoảng 500m
          const nearbyPOIs = data.elements
            .map((poi) => ({
              ...poi,
              distance: getDistance(selectedLocation.lat, selectedLocation.lon, poi.lat, poi.lon),
            }))
            .filter((poi) => poi.distance <= 500) // Chỉ lấy POI trong 500m
            .sort((a, b) => a.distance - b.distance); // Sắp xếp theo khoảng cách tăng dần

          setPoiData(data.elements);
          setNearestPOI(nearbyPOIs.length > 0 ? nearbyPOIs[0] : null);
        }
      })
      .catch((error) => console.error("Lỗi tải POI:", error));
  };

  useEffect(() => {
    if (selectedLocation.lat !== 200) {
      fetchPlaceName(selectedLocation.lon, selectedLocation.lat);
      fetchPOIData();
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
                <Link href='/account/location/add-location' className='relative w-[30px] pt-[30px]'>
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

                    {/* Hiển thị các POI */}
                    {poiData.map(
                      (poi, index) =>
                        poi.lat &&
                        poi.lon &&
                        zoomLevel >= 15 && (
                          <Marker
                            key={index}
                            position={[poi.lat, poi.lon]}
                            icon={getIconForPOI(poi)}
                            eventHandlers={{
                              click: () => {
                                console.log(poi);
                                setSelectedLocation({ lat: poi.lat, lon: poi.lon });
                              },
                            }}
                          ></Marker>
                        )
                    )}
                  </MapContainer>
                )}
              </div>

              <div className='fixed bottom-0 left-0 right-0 bg-[#fff] px-[20px] py-[15px] z-[100]'>
                <div
                  className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] py-[15px] px-[20px] w-full cursor-pointer'
                  onClick={() => {
                    handleChooseLocation({
                      address: `${
                        nearestPOI && nearestPOI.tags.name !== undefined
                          ? `Gần ${nearestPOI.tags.name}, ${dragMarkInput}`
                          : dragMarkInput
                      }`,
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
