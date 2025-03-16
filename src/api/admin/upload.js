import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
    const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ LocalStorage
    const userId = user?.id;

    if (!userId) {
      throw new Error("Không tìm thấy ID người dùng");
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/upload/images`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        params: { id: userId },
      }
    );

    console.log(response.data);
    return response.data[0].url;
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw error;
  }
};
