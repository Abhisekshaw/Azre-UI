import React from "react";
import { format, parseISO } from "date-fns";

const DataTable = ({data}) => {
  console.log({data}, "DataTable Component Data");
  
  // -----------------------
  return (
    <div className="table-container">
      <h3 className="table-title">Sensor Data Table</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Pb</th>
            <th>Tb</th>
            <th>VmT</th>
            <th>VbT</th>
            <th>Qb</th>
            <th>BatR</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((row, i) => (
            <tr key={i}>
              <td>{row.d_details.timestamp}</td>
              <td>{row.flow_data.Pb}</td>
              <td>{row.flow_data.Tb}</td>
              <td>{row.flow_data.VmT}</td>
              <td>{row.flow_data.VbT}</td>
              <td>{row.flow_data.Qb}</td>
              <td>{row.flow_data.Batt_R}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
