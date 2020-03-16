import React from "react";
import Spinner from "../Spinner";
import "./CompanyDetails.scss";

export default function CompanyDetails({ className, text, data }) {
  return (
    <div className={`company__details company__${className}`}>
      <span>{text}</span>
      <span>{data !== "" ? data : <Spinner />}</span>
    </div>
  );
}
