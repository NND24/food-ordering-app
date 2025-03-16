"use client";
import React, { useEffect, useState } from "react";
import "./foodType.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import { getFoodTypes, deleteFoodType } from "../../../api/admin/foodType";

import AddFoodTypePopup from "../../../components/admin-components/FoodType/AddFoodTypePopup/AddFoodTypePopup";
import UpdateFoodTypePopup from "../../../components/admin-components/FoodType/UpdateFoodTypePopup/UpdateFoodTypePopup";

const foodType = () => {
  const [foodTypes, setFoodTypes] = useState([]);

  const [filteredFoodTypes, setFilteredFoodTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchFoodTypes();
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOrder, foodTypes]);

  const fetchFoodTypes = async () => {
    try {
      const data = await getFoodTypes();
      setFoodTypes(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách FoodType:", error);
    }
  };

  const handleSearchAndSort = () => {
    let updatedList = [...foodTypes];

    // Search
    if (searchTerm) {
      updatedList = updatedList.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "id-asc") {
      updatedList.sort((a, b) => a._id.localeCompare(b._id));
    } else if (sortOrder === "id-desc") {
      updatedList.sort((a, b) => b._id.localeCompare(a._id));
    } else if (sortOrder === "name-asc") {
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      updatedList.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredFoodTypes(updatedList);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm/sắp xếp
  };

  // Add a food type
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Update a food type
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [seletedFoodType, setSeletedFoodType] = useState(null);
  const openUpdatePopup = (foodType) => {
    setSeletedFoodType(foodType);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSeletedFoodType(null);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) {
      return toast.error("Food type ID is missing!");
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await deleteFoodType(id);

      Swal.fire({
        icon: "success",
        title: "Food type deleted successfully!",
      });

      setFoodTypes((prev) => prev.filter((item) => item._id !== id)); // Cập nhật UI ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa food type:", error);
      toast.error("Failed to delete food type");
    } finally {
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredFoodTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoodTypes = filteredFoodTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="category">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Food Type</h1>
      <div className="category-list-header">
        <div className="title">
          Food type list
          <div className="action">
            <input
              type="text"
              placeholder="Input food type name ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="id-asc">By Id: Ascending</option>
              <option value="id-desc">By Id: Descending</option>
              <option value="name-asc">By name: A to Z</option>
              <option value="name-desc">By name: Z to A</option>
            </select>
          </div>
        </div>
        <div className="add">
          <button onClick={() => setShowAddPopup(true)}>Add a food type</button>
        </div>
      </div>
      <div className="category-list-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentFoodTypes?.map((foodType, index) => (
              <tr key={foodType._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="row-title">
                    <img src={foodType.image.url} alt="" />
                    {foodType.name}
                  </div>
                </td>
                <td>
                  <div className="action">
                    <button
                      className="update"
                      onClick={() => openUpdatePopup(foodType)}
                    >
                      Update
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(foodType._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {/* Popup add a food type */}
      {showAddPopup && (
        <AddFoodTypePopup
          showAddPopup={showAddPopup}
          setShowAddPopup={setShowAddPopup}
          onFoodTypeAdded={fetchFoodTypes}
        />
      )}
      {/* Popup update a food type */}
      {showUpdatePopup && (
        <UpdateFoodTypePopup
          food={seletedFoodType}
          onClose={closeUpdatePopup}
          onFoodTypeUpdated={fetchFoodTypes}
        />
      )}
    </div>
  );
};

export default foodType;
