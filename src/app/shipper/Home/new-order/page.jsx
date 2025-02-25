import React from 'react'
import Image from 'next/image'
 
import './NewOrder.css'

const NewOrder = () => {
  return (
    <div className='new-order'>
        <div className="new-order-container">
            <h1>Đơn hàng mới</h1>
            <div className="new-order-item">
                <div className="new-order-left">
                    <img src="https://i.ytimg.com/vi/cJu6tFJe_Gc/maxresdefault.jpg" alt="" />
                </div>
                <div className="new-order-right">
                    <div className="new-order-title">
                        <div className="new-order-id">DH123123</div>
                        <h3>Đơn hàng tại quán cơm tấm Bà Năm</h3>
                    </div>
                    <div className="new-order-address">
                        <div className="new-order-address-start">
                            <Image src="/assets/icons/location.png" width={50} height={50} alt="Picture of the author"/>
                            <span>Quán ăn:</span>
                            <p>34 Tân Canh, phường 1, quận Tân Bình</p>
                        </div>
                        <div className="new-order-address-destinatioin">
                            <Image src="/assets/icons/home.png" width={50} height={50} alt="Picture of the author"/>
                            <span>Điểm đến:</span>
                            <p>307/17 Bàu Cát, phường 12, quận Tân Bình</p>
                        </div>
                    </div>
                    <div className="new-order-action">
                        <button className="detail-order">Xem chi tiết</button>
                        <button className="confirm-order">Nhận đơn</button>
                        <button className="deny-order">Không nhận đơn</button>
                    </div>
                </div>
            </div>

            <div className="new-order-item">
                <div className="new-order-left">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1UgUES5_Lnvwi85xXlABEhQS8tRsI0wvXw&s" alt="" />
                </div>
                <div className="new-order-right">
                    <div className="new-order-title">
                        <div className="new-order-id">DH123199</div>
                        <h3>Đơn hàng tại quán phở Phượng</h3>
                    </div>
                    <div className="new-order-address">
                        <div className="new-order-address-start">
                            <Image src="/assets/icons/location.png" width={50} height={50} alt="Picture of the author"/>
                            <span>Quán ăn:</span>
                            <p>25 Hoàng Sa, phường Đa Kao, quận 1, TPHCM</p>
                        </div>
                        <div className="new-order-address-destinatioin">
                            <Image src="/assets/icons/home.png" width={50} height={50} alt="Picture of the author"/>
                            <span>Điểm đến:</span>
                            <p>97 Man Thiện</p>
                        </div>
                    </div>
                    <div className="new-order-action">
                        <button className="detail-order">Xem chi tiết</button>
                        <button className="confirm-order">Nhận đơn</button>
                        <button className="deny-order">Không nhận đơn</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewOrder
