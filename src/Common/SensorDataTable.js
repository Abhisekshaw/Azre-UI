import React from "react";
const SensorDataTable = ({ data, type }) => {
  const isFlow = type === "flow";
  // Helper to format timestamp into separate date and time
  const getDateAndTime = (timestamp) => {
    const dateObj = new Date(timestamp * 1000);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  return (
    <div className="table-container">
      <h3 className="table-title">
        {isFlow ? "Flow Meter Data Table" : "PLC Data Table"}
      </h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            {isFlow ? (
              <>
                <th>Pressure (bar)</th>
                <th>Flowmeter ID</th>
                <th>Temperature (°C)</th>
                <th>Uncorrected Flow Totalizer (M3)</th>
                <th>Corrected Total Flow (SCM)</th>
                <th>Flow rate (SCMH)</th>
                <th>Battery Life Remaining (%)</th>
              </>
            ) : (
              <>
                <th>Mode (Auto/Emergency)</th>
                <th>Plc ID</th>
                <th>Dozing Rate (mg/scm)</th>
                <th>Tank Level (kg)</th>
                <th>Actual Flow (SCMH)</th>
                <th>Fixed Flow (SCMH)</th>
                <th>Yesterday Flow Total (SCMD)</th>
                <th>Yesterday Odorant Consumption (mg)</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.data?.length > 0 ? (
            data?.data.map((row, i) => {
              const { date, time } = getDateAndTime(row?.d_details?.timestamp);

              return (
                <tr key={i}>
                  <td>{date}</td>
                  <td>{time}</td>

                  {isFlow ? (
                    <>
                      <td>{row?.flow_data?.Pb ?? "N/A"}</td>
                      <td>{row?.d_details?.gatewayID ?? "N/A"}</td>
                      <td>{row?.flow_data?.Tb ?? "N/A"}</td>
                      <td>{row?.flow_data?.VmT ?? "N/A"}</td>
                      <td>{row?.flow_data?.VbT ?? "N/A"}</td>
                      <td>{row?.flow_data?.Qb ?? "N/A"}</td>
                      <td>{row?.flow_data?.Batt_R ?? "N/A"}</td>
                    </>
                  ) : (
                    <>
                      <td>{row?.PLC_data?.mode_DI ?? "N/A"}</td>
                      <td>{row?.d_details?.gatewayID ?? "N/A"}</td>
                      <td>{row?.PLC_data?.D_R ?? "N/A"}</td>
                      <td>{row?.PLC_data?.T_L ?? "N/A"}</td>
                      <td>{row?.PLC_data?.A_F ?? "N/A"}</td>
                      <td>{row?.PLC_data?.F_F ?? "N/A"}</td>
                      <td>{row?.PLC_data?.Y_F_T ?? "N/A"}</td>
                      <td>{row?.PLC_data?.Y_O_C ?? "N/A"}</td>
                    </>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={isFlow ? 9 : 9} style={{ textAlign: "center" }}>
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
