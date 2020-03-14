import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import "./Company.scss";

function Company({ company, loading }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    id: "",
    name: "",
    city: "",
    incomes: "",
    income: "",
    averageIncome: "",
    lastMonthIncome: ""
  });
  const useMountEffect = fun => useEffect(fun, [data]);

  let history = useHistory();
  function handleClick() {
    history.goBack();
  }

  useMountEffect(() => {
    company && setData(company);
    console.log(company);
    setLoading(loading);
  });

  return (
    <div className="company">
      <button onClick={handleClick}>Back</button>
      <h2 className="company__name">
        Company: <span>{data.name}</span>
      </h2>
      <p className="company__details">
        ID: <span>{data.id}</span>
      </p>
      <p className="company__details">
        ID: <span>{data.id}</span>
      </p>
    </div>
  );
}
export default Company;
