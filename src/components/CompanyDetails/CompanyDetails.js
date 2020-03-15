import React from "react";
import "./CompanyDetails.scss";

export default function CompanyDetails({ className, text, data }) {
  return (
    <div className={`company__details company__${className}`}>
      <span>{text}</span>
      <span>{data}</span>
    </div>
  );
}
