import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const PowerChart = ({ data, selectedParameter }) => {
  if (!selectedParameter) {
    return <p style={{ textAlign: 'center', marginTop: '1rem' }}>Please select a parameter from the dropdown.</p>;
  }

  const chartData = data.data.map(entry => {
    const timestamp = entry?.d_details?.timestamp;
    const value = entry?.flow_data?.[selectedParameter];

    return {
      time: new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      [selectedParameter]: value
    };
  }).filter(entry => entry[selectedParameter] !== undefined);

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
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerChart;
