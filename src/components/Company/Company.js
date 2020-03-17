import React, { useEffect, useState } from "react";
import CompanyDetails from "../CompanyDetails";
import Calendar from "../Calendar";
import Chart from "../Chart";
import { Link } from "react-router-dom";
import { sum } from "../helpers";
import "./Company.scss";

function Company({ company }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    city: "",
    incomes: "",
    income: ""
  });

  const [periodIncomes, setPeriodIncomese] = useState({
    average: "",
    total: "",
    months: [
      {
        income: "",
        date: ""
      }
    ]
  });

  const details = [
    ["name", "Name:", data.name],
    ["ID", "ID:", data.id],
    ["city", "City:", data.city],
    ["income", "Total income:", data.income],
    ["income-average", "Average incomes:", periodIncomes.average],
    ["income-period", "Income for period:", periodIncomes.total]
  ];

  const [date, setDate] = useState({
    start: new Date(new Date().setHours(0, 0, 0, 0)).setDate(1),
    end: new Date().getTime()
  });

  const useMountEffect = fun => useEffect(fun, []);
  const useDateEffect = fun => useEffect(fun, [date]);

  useDateEffect(() => {
    if (company) {
      const periodIncomes = calcPeriodIncomes();
      setPeriodIncomese(periodIncomes);
    }
  });

  useMountEffect(() => {
    if (company) {
      setData(company);
      const periodIncomes = calcPeriodIncomes();
      setPeriodIncomese(periodIncomes);
    }
  });

  const getMonthsIncomes = incomes => {
    const dates = incomes.map(income => income.date.slice(0, 7));
    const months = Array.from(new Set(dates));
    const monthsIncomes = months.map(month => {
      let monthIcomes = 0;
      incomes.map(
        income =>
          (monthIcomes +=
            income.date.slice(0, 7) === month ? income.value * 1 : 0)
      );
      return {
        value: monthIcomes.toFixed(2) * 1,
        date: month
      };
    });
    return monthsIncomes;
  };
  const calcPeriodIncomes = () => {
    const incomes = company.incomes;
    let filterIncomes = incomes.filter(income => {
      const incomeDate = new Date(income.date).getTime();
      return incomeDate >= date.start && incomeDate < date.end ? true : false;
    });

    const total = sum(filterIncomes) * 1;
    const average = (total / filterIncomes.length).toFixed(2);
    return {
      average: average > 0 ? average : 0,
      total: total > 0 ? total : 0,
      months: getMonthsIncomes(incomes)
    };
  };

  const handleDataChange = (start, end) => {
    const newDate = {
      start,
      end
    };
    setDate(newDate);
  };

  const showCompanyDetail = () => {
    return details.map(detail => (
      <CompanyDetails
        key={detail[0]}
        className={detail[0]}
        text={detail[1]}
        data={detail[2]}
      />
    ));
  };
  return (
    <div className="company">
      <Link to="/company-incomes">
        <i className="material-icons">arrow_back</i>Back
      </Link>
      <h2 className="company__header">Company details</h2>
      {showCompanyDetail()}
      <Calendar date={date} onChange={handleDataChange} />
      <h2 className="company__header">Monthly incomes</h2>
      <Chart data={periodIncomes.months} />
    </div>
  );
}
export default Company;
