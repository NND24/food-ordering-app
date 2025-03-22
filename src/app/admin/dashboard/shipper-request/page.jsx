"use client"
import React from 'react'
import Image from 'next/image'
import './shipper-request.css'

const shipper_request = () => {
  return (
    <div className='shipper-request'>
        <p className='title'>List Of Shipper Requests</p>
        <div className="list-of-request">
            <div className="item">
                <div className="item-left">
                    <img src="https://tiermaker.com/images/templates/skins-brawlhalla-red-raptor-august-2023-16119217/161192171693520922.png" alt="" />
                </div>
                <div className="item-right">
                    <div className="shipper-name">Red Raptor</div>
                    <div className="info-container">
    
                        <div className="info-item">
                            <label>Date of birth:</label>
                            <p>20/03/2001</p>
                        </div>

                        <div className="info-item">
                            <label>Indentical:</label>
                            <p>011111111111</p>
                        </div>
                    </div>
                    
                    <div className="action">
                        <button>Approve</button>
                        <button>Decline</button>
                        <button>More info</button>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default shipper_request
