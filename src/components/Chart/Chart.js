import React, { useEffect, useState, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import "./Chart.scss";

export default function Chart({ data }) {
  const [loading, setLoading] = useState(true);
  const [dataSet, setDataSet] = useState(data);
  // const useDataEffect = fun => useEffect(fun, [data]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDataSet(data);
      setLoading(false);
      // Your useEffect code here to be run on update
    }
  }, [data]);

  return (
    <>
      {!loading ? (
        <ResponsiveBar
          data={dataSet}
          keys={["value"]}
          indexBy="date"
          margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          className="chart"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "month",
            legendPosition: "middle",
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "income",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      ) : (
        <div>Loanding</div>
      )}
    </>
  );
}
