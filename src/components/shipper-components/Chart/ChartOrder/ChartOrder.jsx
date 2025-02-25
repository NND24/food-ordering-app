import React from 'react'
import './ChartOrder.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const ChartOrder = ({title = 'Thống kê đơn hàng', data = [], dataKey = 'value', grid = true}) => {
  return (
    <div className='chart-order'>
        <h3 className="title">{title}</h3>
        <ResponsiveContainer width="90%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#4635B1' />
                <Line type="monotone" dataKey={dataKey} stroke='#4635B1' />
                <Tooltip />
                {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />}
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default ChartOrder
