import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (startDate && endDate) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        onDateChange({ start: startDate, end: endDate });
      }, 300); // Waits 300ms before calling
    }
  }, [endDate]);

  return (
    <div className="date-picker-container">
      <label className="date-label">Select Date Range:</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        dateFormat="dd MMM yyyy"
        className="custom-datepicker"
        popperPlacement="bottom"
        placeholderText="Choose a date range"
        isClearable
      />
    </div>
  );
};
export default DatePickerComponent;
