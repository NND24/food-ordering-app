import React from 'react'
import './Navbar.css'
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="navbar-left">
                <span className="logo">Shipper</span>
            </div>
            <div className="navbar-right">
                <div className="navbar-icons">
                     <div className='relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]'>
                        <Image src='/assets/icons/bell.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                    </div>
                    <span className="top-icon-bag">2</span>   
                </div>
                <img src="https://genk.mediacdn.vn/k:thumb_w/640/2015/1-2-1444483204242/nhung-dieu-thu-vi-ve-pikachu-bieu-tuong-cua-pokemon.png" alt="" className="avatar" />
            </div>
        </div>
    </div>
  )
}

export default Navbar
