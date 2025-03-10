"use client"
import React, { useEffect, useState } from 'react'
import './category.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const category = () => {

    // Add a category
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [categoryName, setCategoryName] = useState("");   

    
    // Update a category
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    const openUpdatePopup = (category) => {
        setSelectedCategory(category);
        setNewCategoryName(category.name);
        setShowUpdatePopup(true);
    };

    const handleUpdate = async () =>{
        if(!newCategoryName.trim()){
            showError(1002);
            return;
        }
        try {
            await updateCategory(selectedCategory.id, {name: newCategoryName});
            toast.success("Category updated successfully!");
            setShowUpdatePopup(false);
            fetchCategories();
        } catch (error) {
            showError(error.response.data.code);
            toast.error("Failed to add category!"); 
        }
    }


  return (
    <div className='category'>
        <ToastContainer position="top-right" autoClose={3000} />
        <h1>Category</h1>
        <div className="category-list-header">
            <div className="title">
                Category list
                <div className="action">
                    <input
                        type="text"
                        placeholder="Input category name or id ..."
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                    // value={sortOrder} 
                    // onChange={(e) => setSortOrder(e.target.value)}
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
                <button onClick={() => setShowAddPopup(true)}>Add a category</button>
            </div>
        </div>
        <div className="category-list-container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Number of dishes</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {currentCategories.map(category => ( */}
                        <tr>
                            <td>1</td>
                            <td>Phở</td>
                            <td>20</td>
                            <td className='action'>
                                <button className='update' 
                                // onClick={() => openUpdatePopup(category)}
                                >Update</button>
                                <button 
                                    className='delete' 
                                    // onClick={() => {
                                    //     if (category.audioBookCount > 0) {
                                    //         showError(1004);
                                    //         toast.error("Cannot delete category with audiobooks!");
                                    //     } else {
                                    //         handleDelete(category.id);
                                    //     }
                                    // }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </div>
        <div className="pagination">
            <button 
                // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                // disabled={currentPage === 1}
                >
                Prev
            </button>
            <span>1 / 3</span>
            <button 
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(categories.length / itemsPerPage)))}
                    // disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
                >
                    Next
            </button>
        </div>
        {/* Popup add a category */}
        {showAddPopup && (
            <div className="add-model-overplay">
                <div className="model">
                    <h3>Add a category</h3>
                    <input type="text" placeholder='Enter category name'
                    // value={categoryName} 
                    // onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <div className="model-buttons">
                        <button>Save</button>
                        <button onClick={() => setShowAddPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}

        {/* Popup update a category */}
        {showUpdatePopup && (
            <div className="update-model-overplay">
                <div className="model">
                    <h3>Update the category</h3>
                    <input type="text"
                    // value={newCategoryName} 
                    // onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <div className="model-buttons">
                        <button>Confirm</button>
                        <button onClick={() => setShowUpdatePopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default category
