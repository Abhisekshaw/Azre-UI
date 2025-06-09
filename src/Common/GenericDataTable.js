import React from "react";

const GenericDataTable = ({ title, columns, data }) => {
  return (
    <div className="table-container">
      <h3 className="table-title">{title}</h3>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j}>
                  {col.render ? col.render(row) : getValue(row, col.path)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper to access nested properties like "flow_data.Pb"
function getValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? "N/A";
}

export default GenericDataTable;
