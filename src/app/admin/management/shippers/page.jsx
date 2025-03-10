"use client"
import './shipper.css'
import Image from 'next/image'
import React from 'react'

const stores = () => {
  return (
    <div className='shipper-list'>
        <h1>Shippers</h1>
        <div className="shipper-list-header">
            <div className="title">
                Shipper list
                <div className="action">
                    <input
                        type="text"
                        placeholder="Input shipper name or id ..." 
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
        </div>

        <div className="shipper-list-container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {currentEmployees.map(employee => ( */}
                        <tr>
                            <td>S0001</td>
                            <td>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg/1200px-C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg" alt="" />
                            </td>
                            <td>Noo Phước Thịnh</td>
                            <td>0932000112</td>
                            <td >
                                <div className="action">
                                    <button>Lock</button>
                                    <button>Detail</button>
                                </div>
                                
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
            <span>
                {/* {currentPage} / {totalPages} */}
                1 / 3
            </span>
            <button 
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(authors.length / itemsPerPage)))}
                    // disabled={currentPage === Math.ceil(authors.length / itemsPerPage)}
                >
                    Next
            </button>
        </div>
        
    </div>
  )
}

export default stores

