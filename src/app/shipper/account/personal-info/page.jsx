"use client"
import React, { useState } from 'react'
import './PersonalInfo.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordPopup from '@/components/shipper-components/Popups/ChangePasswordPopup/ChangePasswordPopup';
import ChangeInfoPopup from '@/components/shipper-components/Popups/ChangeInfoPopup/ChangeInfoPopup';
const PersonalInfo = () => {


    // Change personal info
    const [showChangeInfoPopup, setShowChangeInfoPopup] = useState(false);

    const handleContinueChangeInfo = () => {
        setShowChangeInfoPopup(true);
    }

    const handleChangeInfoClose = () => {
        setShowChangeInfoPopup(false);
    };

    const handleInfoChange = (phoneNumber, address) => {
        if (phoneNumber != "" && address != ""){
            toast.success("Cập nhật thông tin thành công");
            setShowChangeInfoPopup(false);
        } else {
            toast.error("Vui lòng điền đầy đủ thông tin");
        }
    };

    // Change password
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

    const handleContinueChangePassword = () => {
        setShowChangePasswordPopup(true);
    }

    const handleChangePasswordClose = () => {
        setShowChangePasswordPopup(false);
    };

    const handlePasswordChange = (newPassword, confirmPassword) => {
        if (newPassword === confirmPassword) {
            toast.success("Mật khẩu đã được đổi thành công!");
            setShowChangePasswordPopup(false);
        } else {
            toast.error("Mật khẩu không khớp. Vui lòng thử lại!");
        }
    };


  return (
    <div className="personal-info">
        <h1>Thông tin cá nhân</h1>
        <div className="personal-info-container">
            <div className="personal-info-left">
                <div className="title">
                    Ảnh đại diện
                </div>
                <img src="https://genk.mediacdn.vn/k:thumb_w/640/2015/1-2-1444483204242/nhung-dieu-thu-vi-ve-pikachu-bieu-tuong-cua-pokemon.png" alt="" />
                <div className="action">
                    <input type="file" />
                </div>
            </div>
            <div className="personal-info-right">
                <div className="title">
                    Thông tin cá nhân
                </div>
                <div className="info-container">
                    <div className="info-item">
                        <span className='heading'>Mã nhân viên: </span>
                        <span className='info-detail'>SP696969</span>
                    </div>

                    <div className="info-item">
                        <span className='heading'>Họ và tên: </span>
                        <span className='info-detail'>Nguyễn Văn A</span>
                    </div>

                    <div className="info-item">
                        <span className='heading'>Ngày sinh: </span>
                        <span className='info-detail'>01/01/2000</span>
                    </div>

                    <div className="info-item">
                        <span className='heading'>CCCD: </span>
                        <span className='info-detail'>072818211921</span>
                    </div>

                    <div className="info-item">
                        <span className='heading'>SĐT: </span>
                        <span className='info-detail'>093212312</span>
                    </div>

                    <div className="info-item">
                        <span className='heading'>Địa chỉ: </span>
                        <span className='info-detail'> 97 Man Thiện, Phường Hiệp Phú, Thủ Đức, TP. Hồ Chí Minh.<nav></nav></span>
                    </div>
                </div>
                <div className="action">
                    <button onClick={handleContinueChangeInfo}>Chỉnh sửa</button>
                </div>
            </div>
        </div>
        <div className="change-password-container">
            <div className="title">
                ĐỔI MẬT KHẨU
            </div>
            <div className="old-password-container">
                <span>Nhập mật khẩu cũ:</span>
                <input type="password" />

                <div className="action">
                    <button onClick={handleContinueChangePassword}>Tiếp tục</button>
                </div>
            </div>
        </div>

        {/* Show popup */}
        {showChangePasswordPopup && (
            <ChangePasswordPopup 
                onClose = {handleChangePasswordClose}
                onSubmit = {handlePasswordChange}
            />
        )}

        {showChangeInfoPopup && (
            <ChangeInfoPopup 
                onClose = {handleChangeInfoClose}
                onSubmit={handleInfoChange}/>
        )}
        {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

    
  )
}

export default PersonalInfo
