import React from "react";
import "./Calendar.css";

const Calendar = ({ workdays }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderDays = () => {
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = weekDays[date.getDay()];
      const isWorkday = workdays.includes(day);
      days.push(
        <div
          key={day}
          className={`calendar-day ${isWorkday ? "workday" : ""}`}
        >
          <div className="day-label">{dayOfWeek}</div>
          <div>{day}</div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">{`${year} - ${month + 1}`}</div>
      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;