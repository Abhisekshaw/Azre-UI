import React from "react";

const PlcDataTable = ({ data }) => {
  console.log({data});
  return (

    <div className="table-container">
      <h3 className="table-title">PLC Sensor Data Table</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temp</th>
            <th>Voltage</th>
            <th>Current</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{new Date(row?.d_details?.timestamp * 1000).toLocaleString()}</td>
              <td>{row?.plc_data?.temperature ?? "N/A"}</td>
              <td>{row?.plc_data?.voltage ?? "N/A"}</td>
              <td>{row?.plc_data?.current ?? "N/A"}</td>
              <td>{row?.plc_data?.status ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlcDataTable;
