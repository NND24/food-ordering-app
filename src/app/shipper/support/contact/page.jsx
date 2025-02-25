import React from 'react'
import './Contact.css'
const Contact = () => {
  return (
    <div className="contact">
        <h1>Liên hệ</h1>
        <div className="phonenumber">
            <div className="title">Số điện thoại: </div>
            <div className="number">0912381298</div>
        </div>
        <div className="email">
            <div className="email-title">
                <div className="title">Email</div>
                <div className="email-address">ptitdelivery@gmail.com</div>
            </div>
            
            <div className="input-container">
                <h3>Nhập nội dung</h3>
                <textarea name="" id="" className='content'></textarea>
                <div className="action-container">
                    <button className="send-button">Gửi</button>
                    <button className="reset-button">Đặt lại</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact
