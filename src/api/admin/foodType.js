import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createFoodType = async (name, imageUrl) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/foodType`,
      {
        name,
        image: { url: imageUrl },
      },
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo FoodType:", error);
    throw error;
  }
};

export const getFoodTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/foodType`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách FoodType:", error);
    throw error;
  }
};

export const updateFoodType = async (id, name, imageUrl) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/foodType/${id}`,
      {
        name,
        image: imageUrl ? { url: imageUrl } : undefined,
      },
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật FoodType:", error);
    throw error;
  }
};

export const deleteFoodType = async (id) => {
  if (!id) {
    throw new Error("Food type ID is missing");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/foodType/${id}`, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa FoodType:", error);
    throw error;
  }
};
