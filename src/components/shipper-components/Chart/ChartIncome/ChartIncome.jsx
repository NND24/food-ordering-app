"use client"
import dynamic from 'next/dynamic';
import './ChartIncome.css';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

const ChartIncome = ({ title = 'Thống kê thu nhập theo tháng', data = [], dataKey = 'value', grid = true }) => {
  return (
    <div className="chart-income">
        <h3 className="title">{title}</h3>
        <ResponsiveContainer width="90%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5B913B' />
                <Line type="monotone" dataKey={dataKey} stroke='#5B913B' />
                <Tooltip />
                {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />}
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

export default ChartIncome;
