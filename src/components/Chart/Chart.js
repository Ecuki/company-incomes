import React, { useEffect, useState, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Spinner from "../Spinner";
import "./Chart.scss";

export default function Chart({ data }) {
  const [loading, setLoading] = useState(true);
  const [dataSet, setDataSet] = useState(data);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDataSet(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="chart">
      {!loading ? (
        <ResponsiveBar
          className="myChart"
          data={dataSet}
          keys={["value"]}
          indexBy="date"
          margin={{ top: 10, right: 30, bottom: 30, left: 90 }}
          colors={"#222299"}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          layout="horizontal"
          maxValue={
            Math.max.apply(
              Math,
              dataSet.map(function(o) {
                return o.value;
              })
            ) + 5000
          }
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickValues: 7,
            tickRotation: 0,
            legend: null,
            legendPosition: "end",
            legendOffset: 32,
            format: ".0s"
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: null,
            legendPosition: "middle",
            legendOffset: -60
          }}
          padding={0.3}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={"transparent"}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
