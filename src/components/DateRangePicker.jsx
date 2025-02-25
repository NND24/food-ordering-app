import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import { format } from "date-fns";

const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (onChange) {
      onChange({ start, end }); // Pass selected range to the parent component
    }
  };

  return (
    <div className="w-auto mb-2">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        dateFormat="dd/MM/yyyy"
        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fc6011] focus:border-[#fc6011] text-sm w-full"
        placeholderText="Chọn ngày từ... đến ngày..."
      />
      
      {/* Display the selected range */}
      {/* {startDate && endDate && (
        <div className="mt-4 p-3 bg-gray-50 border rounded-md shadow-sm">
          <p className="text-sm text-gray-800">
            <strong>Ngày bắt đầu:</strong> {format(startDate, "dd/MM/yyyy")}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Ngày kết thúc:</strong> {format(endDate, "dd/MM/yyyy")}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default DateRangePicker;
