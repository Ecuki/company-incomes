import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.scss";

export default function Calendar({ date, onChange }) {
  const startDate = new Date(date.start);
  const endDate = new Date(date.end);
  const actualDate = new Date();

  return (
    <div className="calendar">
      <div className="calendar__element">
        <span>Start:</span>
        <DatePicker
          selected={startDate}
          onChange={date => onChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
        />
      </div>
      <div className="calendar__element">
        <span>End:</span>
        <DatePicker
          selected={endDate}
          onChange={date => onChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={actualDate}
        />
      </div>
    </div>
  );
}
