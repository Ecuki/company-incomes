import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.scss";

export default function Calendar({ date, onChange }) {
  const startDate = new Date(date.start);
  const endDate = new Date(date.end);

  return (
    <>
      <DatePicker
        className="date-start"
        selected={startDate}
        onChange={date => onChange(date, endDate)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
      />

      <DatePicker
        className="date-end"
        selected={endDate}
        onChange={date => onChange(startDate, date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={endDate}
      />
    </>
  );
}
