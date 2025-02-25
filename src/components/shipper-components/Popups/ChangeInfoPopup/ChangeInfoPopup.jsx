import React, { useState } from 'react'
import './ChangeInfoPopup.css'
const ChangeInfoPopup = ({onClose, onSubmit}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = () => {
        onSubmit(phoneNumber, address);
    }
  return (
    <div className="change-info-popup">
      <div className="popup-content-change-info">
        <h1>Cập nhật thông tin cá nhân</h1>
        <form action="">
            <div className="info-container">
                <div className="info-item-row">
                    <div className="item">
                        <span>Mã nhân viên:</span>
                        <input type="text" name="" id="" readOnly placeholder='SP123123'/>
                    </div>
                    <div className="item">
                        <span>Họ và tên:</span>
                        <input type="text" name="" id="" readOnly placeholder='Nguyễn Văn A'/>
                    </div>
                </div>
                <div className="info-item-row">
                    <div className="item">
                        <span>Căn cước:</span>
                        <input type="text" name="" id="" readOnly placeholder='07231399123'/>
                    </div>
                    <div className="item">
                        <span>SĐT:</span>
                        <input type="text" value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                </div>
                <div className="info-item-row">
                    <div className="item">
                        <span className='address-title'>Địa chỉ:</span>
                        <input type="text"  className='address-input'
                        value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                </div>  
            </div>
        </form> 
        <div className="popup-actions-update-info">
            <button className="confirm" onClick={handleSubmit}>Xác nhận</button>
            <button className='cancel' onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}

export default ChangeInfoPopup
