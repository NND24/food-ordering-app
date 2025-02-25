import React from 'react'
import './MoneyCalculation.css'

const MoneyCalculation = () => {
  return (
    <div className='money-calculation'>
        <div className="money-calculation-title">
            <h1>Bảng giá tính tiền</h1>
        </div>
        <div className="money-calculation-fomula">
            <h4>Công thức:</h4>
            <p>Phí ship = Phí cơ bản + (Đơn giá mỗi km × Khoảng cách) + Phụ phí (nếu có)</p>
        </div>
        <div className="money-calculation-table">
            <table>
                <tr>
                    <th className='first'>Tên hạng mục</th>
                    <th>Giá trị</th>
                    <th>Ghi chú</th>
                </tr>
                <tr>
                    <td>Phí cơ bản</td>
                    <td>10.000 - 20.000 VNĐ</td>
                    <td>Đây là mức phí cố định do ứng dụng/dịch vụ quy định</td>
                </tr>
                <tr>
                    <td>Đơn giá mỗi km</td>
                    <td></td>
                    <td>Phí giao hàng theo km, áp dụng từ điểm lấy đồ ăn đến điểm giao.</td>
                </tr>
                <tr>
                    <td>Phụ phí</td>
                    <td>
                        - Giờ cao điểm: Thêm 5.000 - 10.000 VNĐ. <br />
                        - Đơn hàng nhỏ: Thêm phí nếu giá trị đơn hàng thấp hơn mức tối thiểu. <br />
                        - Khu vực ngoại thành hoặc khó giao: Phụ phí từ 10.000 - 20.000 VNĐ. <br />
                    </td>
                    <td>Áp dụng trong các trường hợp đặc biệt</td>
                </tr>
            </table>
        </div>
    </div>
  )
}

export default MoneyCalculation
