"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/1689/1689246.png",
  iconSize: [40, 40],
});

const MapView = ({ lat, lon, address }) => {
  return (
    <MapContainer
      key={`${lat}-${lon}`}
      center={[lat, lon]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={[lat, lon]} icon={homeIcon}>
        <Popup>{address || "Cửa hàng"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
