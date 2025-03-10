import React from 'react'
import './FeaturedInfo.css'

const FeaturedInfo = () => {
  return (
    <div className='featured'>
        <div className="featured-item">
            <span className="featured-title">Revanue</span>
            <div className="featured-money-container">
                <span className="featured-money">$2,41</span>
                <span className="featured-money-rate">-11,4</span>
            </div>
            <span className='featured-sub'>Compared to last month</span>
        </div>

        <div className="featured-item">
            <span className="featured-title">Sales</span>
            <div className="featured-money-container">
                <span className="featured-money">$2,41</span>
                <span className="featured-money-rate">-1,4 </span>
            </div>
            <span className='featured-sub'>Compared to last month</span>
        </div>

        <div className="featured-item">
            <span className="featured-title">Cost</span>
            <div className="featured-money-container">
                <span className="featured-money">$2,41</span>
                <span className="featured-money-rate">+1,4</span>
            </div>
            <span className='featured-sub'>Compared to last month</span>
        </div>
      
    </div>
  )
}

export default FeaturedInfo
