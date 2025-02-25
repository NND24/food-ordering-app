import React from 'react'
import './Workdays.css'
import Calendar from '@/components/shipper-components/Calendar/Calendar';
const Schedule = () => {
  const workdays = [1, 5, 10, 15, 20, 25];
  return (
    <div className="workdays">
        <div className="header">
            <h1>Lịch làm việc</h1>
        </div>
        <div className="workdays-container">
            <Calendar workdays={workdays}/>
        </div>
    </div>
  )
}

export default Schedule
