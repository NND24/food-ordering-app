export const haversineDistance = (coords1, coords2) => {
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

export const calculateTravelTime = (distance, speed = 40) => {
  return distance / speed; // Thời gian tính theo giờ
};
