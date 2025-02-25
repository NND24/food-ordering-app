import React, { useState } from 'react'
import './ChangePasswordPopup.css'
const ChangePasswordPopup = ({onClose, onSubmit}) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        onSubmit(newPassword, confirmPassword);
    };
  return (
    <div className="change-password-popup">
      <div className="popup-content">
        <h2>Đổi mật khẩu mới</h2>
        <div>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="popup-actions">
          <button onClick={handleSubmit}>Xác nhận</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPopup
