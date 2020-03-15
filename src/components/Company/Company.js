import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../CompanyDetails";
import Calendar from "../Calendar";
import Chart from "../Chart";
import { sum } from "../helpers";
import "./Company.scss";

function Company({ company, loading }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    city: "",
    incomes: "",
    income: ""
  });

  const [date, setDate] = useState({
    start: new Date(new Date().setHours(0, 0, 0, 0)).setDate(1),
    end: new Date().getTime()
  });

  function handleClick() {
    history.goBack();
  }

  const useMountEffect = fun => useEffect(fun, [loading]);
  const useDateEffect = fun => useEffect(fun, [date]);
  let history = useHistory();
  const [periodIncomes, setPeriodIncomese] = useState({
    average: "",
    total: "",
    months: {
      income: "",
      date: ""
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
  const details = [
    ["name", "Company:", data.name],
    ["ID", "ID:", data.id],
    ["city", "City:", data.city],
    ["income", "Total income:", data.income],
    ["income-average", "Average of company incomes:", periodIncomes.average],
    ["income-period", "Income for period:", periodIncomes.total]
  ];
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
      <button onClick={handleClick}>Back</button>
      <h2 className="company__header">Company details</h2>
      {showCompanyDetail()}
      <Calendar date={date} onChange={handleDataChange} />
      {console.log(periodIncomes.months)}
      {loading ? <div>Loanding</div> : <Chart data={periodIncomes.months} />}
    </div>
  );
}
export default Company;
