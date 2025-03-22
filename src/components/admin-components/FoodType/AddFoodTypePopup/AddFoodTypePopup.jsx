import { useState } from "react";
import "./AddFoodTypePopup.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { uploadImage } from "../../../../api/admin/upload";
import { createFoodType } from "../../../../api/admin/foodType";

const AddFoodTypePopup = ({
  showAddPopup,
  setShowAddPopup,
  onFoodTypeAdded
}) => {
  const [foodType, setFoodType] = useState({
    name: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFoodType((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodType((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!foodType.name.trim()) {
      return toast.error("Food type name is required");
    }

    if (!foodType.image) {
      return toast.error("Please upload an image");
    }

    try {
      // 1️⃣ Upload ảnh trước
      const imageUrl = await uploadImage(foodType.image);

      // 2️⃣ Sau khi upload xong, tạo food type
      await createFoodType(foodType.name, imageUrl);
      if (onFoodTypeAdded) {
        onFoodTypeAdded();
      }

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Food type added successfully!",
      });

      // Đóng popup và reset form
      setShowAddPopup(false);
      setFoodType({ name: "", image: null });
      setPreviewImage(null);
    } catch (error) {
      toast.error("Failed to add food type");
    } finally {
      setLoading(false);
    }
  };

  return (
    showAddPopup && (
      <div className="add-food-type-model-overplay">
        <div className="model">
          <h3>Add a Food Type</h3>

          <div className="item">
            <label>Food Type Name:</label>
            <input
              type="text"
              placeholder="Enter name"
              value={foodType.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="item">
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {previewImage && (
            <div className="preview">
              <p>Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <div className="model-buttons">
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setShowAddPopup(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddFoodTypePopup;
