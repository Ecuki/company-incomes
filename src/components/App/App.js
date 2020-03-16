import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Table from "../MyTable";
import Company from "../Company";
import NotFoundPage from "../NotFoundPage";
import { sum } from "../helpers";
import "./App.scss";

function App() {
  const URL_COMPANIES = "https://recruitment.hal.skygate.io/companies";
  const URL_INCOMES = "https://recruitment.hal.skygate.io/incomes/";
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [companies, setCompanies] = useState([]);
  const useMountEffect = fun => useEffect(fun, []);

  async function fetchData() {
    try {
      let data = await (await fetch(URL_COMPANIES)).json();
      let company = await Promise.all(
        data.map(async item => {
          const res = await (await fetch(URL_INCOMES + item.id)).json();
          item.income = sum(res.incomes);
          item.incomes = res.incomes.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          return item;
        })
      );
      company.sort((a, b) => b.income * 1 - a.income * 1);
      setCompanies(company);
    } catch (err) {
      setErrors(err);
    }
  }

  const searchCompany = id => {
    const company = companies.filter(item => item.id * 1 === id * 1)[0];
    return company;
  };

  useMountEffect(() => {
    fetchData().then(setLoading(false));
  });

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Table companies={companies} />}
        />
        <Route
          path="/company/:id"
          component={props => (
            <Company
              company={searchCompany(props.match.params.id)}
              loading={loading}
            />
          )}
        />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
