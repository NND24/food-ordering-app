"use client"
import React from 'react'
import Image from 'next/image'
import './store-request.css'

const store_request = () => {
  return (
    <div className='store-request'>
        <p className='title'>List Of Store Requests</p>
        <div className="list-of-request">
            <div className="item">
                <div className="item-left">
                    <img src="https://bizweb.dktcdn.net/thumb/grande/100/438/465/articles/banh-hamburger.jpg?v=1666149562887" alt="" />
                    <div className='store-owner'>
                        <div className='relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]'>
                            <Image src='/assets/admin-icons/store-owner.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                        </div>
                        Noo Phước Thịnh
                    </div>
                </div>
                <div className="item-right">
                    <div className="store-name">Burger King</div>
                    <div className="address">
                        <div className='relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]'>
                            <Image src='/assets/admin-icons/location.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                        </div>
                        205/32 Thoại Ngọc Hầu, Phú Thạnh, Tân Phú, TPHCM
                    </div>
                    <button>Detail Store</button>
                </div>
            </div>

            <div className="item">
                <div className="item-left">
                    <img src="https://bizweb.dktcdn.net/thumb/grande/100/438/465/articles/banh-hamburger.jpg?v=1666149562887" alt="" />
                    <div className='store-owner'>
                        <div className='relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]'>
                            <Image src='/assets/admin-icons/store-owner.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                        </div>
                        Noo Phước Thịnh
                    </div>
                </div>
                <div className="item-right">
                    <div className="store-name">Burger King</div>
                    <div className="address">
                        <div className='relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]'>
                            <Image src='/assets/admin-icons/location.png' alt='' layout='fill' objectFit='cover' className='rounded-[8px]' />
                        </div>
                        205/32 Thoại Ngọc Hầu, Phú Thạnh, Tân Phú, TPHCM
                    </div>
                    <button>Detail Store</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default store_request
