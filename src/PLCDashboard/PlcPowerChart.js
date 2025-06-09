import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const PlcPowerChart = ({ data, selectedParameter }) => {
  if (!selectedParameter) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Please select a parameter from the dropdown.
      </p>
    );
  }

  if (!data?.data?.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No data available to display the chart.
      </p>
    );
  }

  const chartData = data?.data?.map((entry) => {
      const rawTimestamp = entry?.d_details?.timestamp;

      // Try to parse timestamp in seconds or ISO format
      const date =
        typeof rawTimestamp === "number"
          ? new Date(rawTimestamp * 1000)
          : new Date(rawTimestamp);

      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      const value = entry?.flow_data?.[selectedParameter];

      return {
        time,
        [selectedParameter]: value
      };
    })
    .filter((entry) => entry[selectedParameter] !== undefined);

  if (!chartData.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No valid data found for selected parameter: <strong>{selectedParameter}</strong>
      </p>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">{selectedParameter} Line Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={selectedParameter}
            stroke="#4b0082"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlcPowerChart;
