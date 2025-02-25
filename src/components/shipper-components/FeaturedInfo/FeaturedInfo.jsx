import React from 'react'
import './FeaturedInfo.css'
// import increase_icon from '../../assets/icons/increase.png'
// import decrease_icon from '../../assets/icons/decrease.png'

const FeaturedInfo = () => {
  return (
    <div className='featured-info'>

        <div className="featured-item">
            <div className="featured-title">Tổng thu nhập</div>
            <div className="featured-container">
                <span className="featured-number">652 023 VNĐ</span>
                <span className="feartured-rate">
                    <p>11%</p>
                    {/* <img src={increase_icon} alt="" /> */}
                </span>
            </div>
            <span className="featured-sub">So với tháng 12</span>
        </div>

        <div className="featured-item">
            <div className="featured-title">Số đơn hàng</div>
            <div className="featured-container">
                <span className="featured-number">32 đơn</span>
                <span className="feartured-rate">
                    <p>20%</p>
                    {/* <img src={decrease_icon} alt="" /> */}
                </span>
            </div>
            <span className="featured-sub">So với tháng 12</span>
        </div>

    </div>
  )
}

export default FeaturedInfo
