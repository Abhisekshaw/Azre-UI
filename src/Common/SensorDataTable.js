import React from "react";

const SensorDataTable = ({ data, type }) => {
  // console.log({ data }, "SensorDataTable Component Data");

  const isFlow = type === "flow";

  return (
    <div className="table-container">
      <h3 className="table-title">
        {isFlow ? "Flowmeter Sensor Data Table" : "PLC Sensor Data Table"}
      </h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Time</th>
            {isFlow ? (
              <>
                <th>Pb</th>
                <th>Tb</th>
                <th>VmT</th>
                <th>VbT</th>
                <th>Qb</th>
                <th>BatR</th>
              </>
            ) : (
              <>
                <th>Temp</th>
                <th>Voltage</th>
                <th>Current</th>
                <th>Status</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((row, i) => (
              <tr key={i}>
                <td>
                  {isFlow
                    ? row?.d_details?.timestamp
                    : new Date(row?.d_details?.timestamp * 1000).toLocaleString()}
                </td>

                {isFlow ? (
                  <>
                    <td>{row?.flow_data?.Pb ?? "N/A"}</td>
                    <td>{row?.flow_data?.Tb ?? "N/A"}</td>
                    <td>{row?.flow_data?.VmT ?? "N/A"}</td>
                    <td>{row?.flow_data?.VbT ?? "N/A"}</td>
                    <td>{row?.flow_data?.Qb ?? "N/A"}</td>
                    <td>{row?.flow_data?.Batt_R ?? "N/A"}</td>
                  </>
                ) : (
                  <>
                    <td>{row?.plc_data?.temperature ?? "N/A"}</td>
                    <td>{row?.plc_data?.voltage ?? "N/A"}</td>
                    <td>{row?.plc_data?.current ?? "N/A"}</td>
                    <td>{row?.plc_data?.status ?? "N/A"}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isFlow ? 7 : 5} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDataTable;
