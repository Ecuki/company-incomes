import React, { useState, useEffect, useRef } from "react";
import "./MyTable.scss";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

export default function MyTable({ companies, loading }) {
  const [data, setData] = useState(companies);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setData(companies);
    }
  }, [companies]);

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
      <Link to={`/company-incomes/${row.id}`}>
        {c.lookup ? c.lookup[row[c.field]] : row[c.field]}
      </Link>
    ),
    ...c
  }));

  return (
    <MaterialTable
      title="Company Incomes"
      columns={columns}
      data={data}
      isLoading={data[0] ? false : true}
      options={{
        headerStyle: {
          backgroundColor: "#9933ff",
          color: "#fff",
          fontWeight: 600
        },
        activeSortIcon: {
          opacity: 0.5
        },
        inactiveSortIcon: {
          opacity: 0.7
        }
      }}
    />
  );
}
