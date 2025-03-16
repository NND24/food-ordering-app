import { useState } from "react";
import "./UpdateFoodTypePopup.css";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { uploadImage } from "../../../../api/admin/upload";
import { updateFoodType } from "../../../../api/admin/foodType";

const UpdateFoodTypePopup = ({ food, onClose, onFoodTypeUpdated }) => {
  const [foodType, setFoodType] = useState({
    name: food.name,
    image: null,
    preview: food.image.url,
  });

  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setFoodType((prev) => ({ ...prev, name: event.target.value }));
  };

  // Xử lý chọn ảnh mới
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setFoodType((prev) => ({
        ...prev,
        image: file,
        preview: imagePreviewUrl,
      }));
    }
  };

  const handleUpdate = async () => {
    if (!foodType.name.trim()) {
      return toast.error("Food type name is required");
    }

    if (!food._id) {
      return toast.error("Food type ID is missing!");
    }

    try {
      setLoading(true);
      let imageUrl = food.image?.url || "";

      if (foodType.image) {
        imageUrl = await uploadImage(foodType.image);
      }

      await updateFoodType(food._id, foodType.name, imageUrl);

      Swal.fire({
        icon: "success",
        title: "Food type updated successfully!",
      });

      onFoodTypeUpdated(); // Cập nhật danh sách food type
      onClose(); // Đóng popup
    } catch (error) {
      toast.error("Failed to update food type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-food-type-model-overplay">
      <div className="model">
        <h3>Update a food type</h3>
        <div className="item">
          <label>Food type name: </label>
          <input
            type="text"
            placeholder="Enter name"
            value={foodType.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="item">
          <label>Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="preview">
          <p>Preview:</p>
          <img
            src={foodType.preview}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        <div className="model-buttons">
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodTypePopup;
