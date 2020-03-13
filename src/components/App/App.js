import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "../MyTable";

function App() {
  const urlCompanies = "https://recruitment.hal.skygate.io/companies";
  const urlIncomes = "https://recruitment.hal.skygate.io/incomes/";
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [companies, setCompanies] = useState([]);

  function sum(arr) {
    let sum = arr.reduce((a, b) => a + b.value * 1, 0);
    return sum;
  }

  async function fetchData() {
    let data = [];
    try {
      data = await (await fetch(urlCompanies)).json();
      await Promise.all(
        data.map(async item => {
          const res = await (await fetch(`${urlIncomes}${item.id}`)).json();
          item.income = sum(res.incomes);
          item.incomes = res.incomes;
          return item;
        })
      );
      data.sort((a, b) => b.income * 1 - a.income * 1);
      setCompanies(data);
    } catch (err) {
      setErrors(err);
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <span>Loading</span>
      ) : (
        <Table companies={companies} isLoanding={loading} hasError={hasError} />
      )}
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
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
