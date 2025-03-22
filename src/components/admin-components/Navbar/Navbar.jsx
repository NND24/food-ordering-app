import React from 'react'
import './Navbar.css'
import Image from "next/image";


const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-container">
            <div className="navbar-left">
                <span className="logo">ADMIN</span>
            </div>
            <div className="navbar-right">
                <div className="navbar-icons">
                    <Image src='/assets/icons/bell.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                    <span className="top-icon-bag">2</span>   
                </div>
                <img src="https://i.scdn.co/image/ab6761610000e5eb56d2d8d16ddedbf61b1c74f0" alt="" className="avatar" />
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
