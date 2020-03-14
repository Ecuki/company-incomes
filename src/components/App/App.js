import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Table from "../MyTable";
import Company from "../Company";

function App() {
  const urlCompanies = "https://recruitment.hal.skygate.io/companies";
  const urlIncomes = "https://recruitment.hal.skygate.io/incomes/";
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [companies, setCompanies] = useState([]);
  const useMountEffect = fun => useEffect(fun, []);

  function sum(arr) {
    let sum = arr.reduce((a, b) => a + b.value * 1, 0).toFixed(2);
    return sum;
  }

  async function fetchData() {
    let data = [];
    try {
      data = await (await fetch(urlCompanies)).json();
      let people = await Promise.all(
        data.map(async item => {
          const res = await (await fetch(`${urlIncomes}${item.id}`)).json();
          item.income = sum(res.incomes);
          item.incomes = res.incomes;
          return item;
        })
      );
      people.sort((a, b) => b.income * 1 - a.income * 1);
      setCompanies(people);
    } catch (err) {
      setErrors(err);
    }
  }

  const searchCompany = id => {
    console.log(id);
    const company = companies.filter(item => item.id * 1 === id * 1);
    return company[0];
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
          component={() => (
            <Table
              companies={companies}
              loading={loading}
              hasError={hasError}
            />
          )}
        />
        <Route
          path="/company/:id"
          component={props => (
            <Company company={searchCompany(props.match.params.id)} />
          )}
        />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}

export default App;

// async function fetchData() {
//   let data = [];
//   try {
//     data = await (await fetch(urlCompanies)).json();
//     console.log(data);
//     setCompanies(
//       await Promise.all(
//         (data.incomes = data.map(
//           async item => await (await fetch(`${urlIncomes}${item.id}`)).json()
//         ))
//       )
//     );
//   } catch (err) {
//     setErrors(err);
//   }
// }
//

// async function fetchData() {
//   axios
//     .get(urlCompanies)
//     .then(res => {
//       res.data.map(item =>
//         axios.get(urlIncomes + item.id).then(response => {
//           item.incomes = response.data.incomes;
//           item.income = calcSum(response.data.incomes);
//         })
//       );
//       return res.data;
//     })
//     .then(res => {
//       console.log(res[0].income);
//       res.sort((a, b) => a.income * 1 - b.income * 1);
//       setCompanies(res);
//     })

//     .catch(err => {
//       setErrors(err);
//     });
// }
