import React from 'react'
import './Sidebar.css'
import Link from "next/link";


const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-container">
            <div className="sidebar-menu">
                <div className="sidebar-title">Dashboard</div>
                <div className="sidebar-list">
                    <Link href="/shipper/Home" className='link'>
                        <li className="sidebar-item">
                            Trang chủ
                        </li>
                    </Link>
                    <Link href="/shipper/Home/new-order" className='link'>
                        <li className="sidebar-item">
                            Nhận đơn mới
                        </li>
                    </Link>
                </div>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">Danh sách đơn hàng</div>
                <div className="sidebar-list">
                    <li className="sidebar-item">
                        Đơn hàng đang giao
                    </li>
                    <Link href="shipper/order-list/order-history" className='link'>
                        <li className="sidebar-item">
                            Lịch sử đơn hàng
                        </li>
                    </Link>
                </div>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">Tài khoản</div>
                <div className="sidebar-list">
                    <Link href="/shipper/account/personal-info" className='link'>
                        <li className="sidebar-item">
                            Thông tin cá nhân
                        </li>
                    </Link>
                    <Link href="/shipper/account/workdays" className='link'>
                        <li className="sidebar-item">
                            Lịch làm việc
                        </li>
                    </Link>    
                </div>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">Thu nhập</div>
                <div className="sidebar-list">
                    <Link href="/shipper/income/income-detail" className='link'>
                        <li className="sidebar-item">
                            Chi tiết thu nhập
                        </li>
                    </Link>
                    
                    <Link href="/shipper/income/money-calculation" className='link'>
                        <li className="sidebar-item">
                            Bảng giá tính tiền
                        </li>
                    </Link>
                </div>
            </div>

            <div className="sidebar-menu">
                <div className="sidebar-title">Hỗ trợ</div>
                <div className="sidebar-list">
                    <Link href="/shipper/support/contact" className='link'>
                        <li className="sidebar-item">
                            Liên hệ bộ phận hỗ trợ
                        </li>
                    </Link>
                    
                    <Link href="/shipper/support/faq" className='link'>
                        <li className="sidebar-item">
                            Câu hỏi thường gặp (FAQ)
                        </li>
                    </Link>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
