"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

import Swal from "sweetalert2";

import { login } from "../../../../api/admin/auth";
const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password); // Gọi API từ file riêng

      // Lưu token & user info vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data._id, role: data.role })
      );

      // Hiển thị thông báo thành công
      toast.success("Success Notification !", {
        position: "top-right",
        closeButton: false,
      });

      // Chuyển hướng sau 1 giây
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (err) {
      console.log(err);

      // Hiển thị cảnh báo khi thất bại
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại!",
        text: err.message || "Email hoặc mật khẩu không đúng.",
      });

      setError(err.message);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className="login-container">
        <div className="login-box">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <div className="forgot-password">
              <a href="/admin/auth/forgot-password">Quên mật khẩu?</a>
            </div>

            <button type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
