import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DynamicLineChart = ({ data, selectedParameter, sourceType }) => {
  console.log(data.data,"------");
  console.log(sourceType,"---************---");
  if (!selectedParameter) {
    return (
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Please select a parameter from the dropdown.
      </p>
    );
  }

  if (!data?.data?.length) {
    return (
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        No data available to display the chart.
      </p>
    );
  }

  const chartData = data.data.map((entry) => {
      const timestamp = entry?.d_details?.timestamp;
      const date = typeof timestamp === 'number'
        ? new Date(timestamp * 1000)
        : new Date(timestamp);

      const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      const sourceData = sourceType === 'plc' ? entry?.PLC_data : entry?.flow_data;

      const value = sourceData?.[selectedParameter];

      return value !== undefined ? { time, [selectedParameter]: value } : null;
    })
    .filter(Boolean); // Remove null entries

  if (!chartData.length) {
    return (
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
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
            stroke={sourceType === 'plc' ? '#4b0082' : '#8884d8'}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicLineChart;
