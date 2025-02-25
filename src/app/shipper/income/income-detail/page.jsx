import React from 'react'
import './IncomeDetail.css'
import FeaturedInfo from '@/components/shipper-components/FeaturedInfo/FeaturedInfo'
import ChartIncome from '@/components/shipper-components/Chart/ChartIncome/ChartIncome'
// import ChartOrder from '@/components/shipper-components/Chart/ChartOrder/ChartOrder'

import {incomeData} from './dummy-data'
// import {orderData} from './dummy-data'
const IncomeDetail = () => {
  return (
    <div className='income-detail'>
        <div className="income-detail-header">
            <h1>Thống kê thu nhập trong tháng</h1>
        </div>
        <div className="featurer-info-container">
            <FeaturedInfo/>
        </div>
        <div className="chart-container">
            <div className="chart-income-container">
                <ChartIncome data={incomeData} title="Thống kê thu nhập" grid dataKey="Money"/>
            </div>
            {/* <div className="chart-order-container">
                <ChartOrder data={orderData} title="Thống kê số đơn" grid dataKey="Order"/>
            </div> */}
        </div>
        
    </div>
  )
}

export default IncomeDetail
