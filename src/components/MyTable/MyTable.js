import React, { useState, useEffect } from "react";
import "./MyTable.scss";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

export default function MyTable({ companies, loading }) {
  const [data, setData] = useState(companies);
  const [isLoading, setLoading] = useState(loading);

  const useLoandingEffect = fun => useEffect(fun, [loading]);
  const columns = [
    {
      title: "ID",
      field: "id",
      type: "numeric"
    },
    { title: "Name", field: "name" },
    { title: "City", field: "city" },
    {
      title: "Total income",
      field: "income",
      type: "numeric"
    }
  ].map(c => ({
    render: row => (
      <Link to={`/company/${row.id}`}>
        {c.lookup ? c.lookup[row[c.field]] : row[c.field]}
      </Link>
    ),
    ...c
  }));
  useLoandingEffect(() => {
    companies.id && setData(companies);
    setLoading(loading);
  });
  return (
    <MaterialTable
      title="Company incomes"
      columns={columns}
      data={data}
      isLoading={isLoading}
      options={{
        headerStyle: {
          backgroundColor: "#121299",
          color: "#fff",
          fontWeight: 600
        }
      }}
    />
  );
}
