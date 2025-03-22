"use client"
import React from 'react'
import './Sidebar.css'
import Link from "next/link";
import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-container">
            <div className="sidebar-menu">
                <div className="sidebar-title">Dashboard</div>
                <ul className="sidebar-list">
                    <Link href="/admin" className='link'>
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/home.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Home</span>
                        </li>
                    </Link>
                    
                    <Link href="/admin/dashboard/store-request" className='link'>
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/store.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Store Request</span>
                        </li>
                    </Link>

                    <Link href="/admin/dashboard/shipper-request" className='link'>
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/interview.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Shipper Request</span>
                        </li>
                    </Link>
                    
                    
                </ul>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">List Management</div>
                <ul className="sidebar-list">
                    <Link href="/admin/management/stores">
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/restaurant.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Stores</span>
                        </li>
                    </Link>

                    <Link href="/admin/management/shippers">
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/fast-delivery.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Shippers</span>
                        </li>
                    </Link>
                    
                    
                </ul>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">App management</div>
                <ul className="sidebar-list">
                    <Link href="/admin/food-type">
                        <li className="sidebar-list-item">
                            <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                                <Image src='/assets/admin-icons/category.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                            </div>
                            <span>Food Type</span>
                        </li> 
                    </Link>
                          
                </ul>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">Staff</div>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <div className=' relative w-[30px] h-[30px] pt-[30px]'>
                            <Image src='/assets/admin-icons/group.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' /> 
                        </div>
                        <span>Employee management</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
