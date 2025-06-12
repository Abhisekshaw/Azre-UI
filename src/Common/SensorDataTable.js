// import React from "react";

// const SensorDataTable = ({ data, type }) => {

//   const isFlow = type === "flow";

//   return (
//     <div className="table-container">
//       <h3 className="table-title">
//         {isFlow ? "Flowmeter Sensor Data Table" : "PLC Sensor Data Table"}
//       </h3>

//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Time</th>
//             {isFlow ? (
//               <>
//                 <th>Pb</th>
//                 <th>Tb</th>
//                 <th>VmT</th>
//                 <th>VbT</th>
//                 <th>Qb</th>
//                 <th>BatR</th>
//               </>
//             ) : (
//               <>
//                 <th>D_R</th>
//                 <th>T_L</th>
//                 <th>A_F</th>
//                 <th>F_F</th>
//                 <th>Y_F_T</th>
//                 <th>Y_O_C</th>
//               </>
//             )}
//           </tr>
//         </thead>

//         <tbody>
//           {data?.data?.data?.length > 0 ? (
//             data.data.data.map((row, i) => (
//               <tr key={i}>
//                 <td>
//                   {isFlow
//                     ? row?.d_details?.timestamp
//                     : new Date(row?.d_details?.timestamp * 1000).toLocaleString()}
//                 </td>

//                 {isFlow ? (
//                   <>
//                     <td>{row?.flow_data?.Pb ?? "N/A"}</td>
//                     <td>{row?.flow_data?.Tb ?? "N/A"}</td>
//                     <td>{row?.flow_data?.VmT ?? "N/A"}</td>
//                     <td>{row?.flow_data?.VbT ?? "N/A"}</td>
//                     <td>{row?.flow_data?.Qb ?? "N/A"}</td>
//                     <td>{row?.flow_data?.Batt_R ?? "N/A"}</td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{row?.PLC_data?.D_R ?? "N/A"}</td>
//                     <td>{row?.PLC_data?.T_L ?? "N/A"}</td>
//                     <td>{row?.PLC_data?.A_F ?? "N/A"}</td>
//                     <td>{row?.PLC_data?.F_F ?? "N/A"}</td>
//                      <td>{row?.PLC_data?.Y_F_T?? "N/A"}</td>
//                       <td>{row?.PLC_data?.Y_O_C?? "N/A"}</td>
//                   </>
//                 )}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={isFlow ? 7 : 5} style={{ textAlign: "center" }}>
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SensorDataTable;
import React from "react";

const SensorDataTable = ({ data, type }) => {
  const isFlow = type === "flow";

  // Function to extract date and time from timestamp
  const formatDateAndTime = (timestamp, isMilliseconds = false) => {
    const dateObj = new Date(isMilliseconds ? timestamp : timestamp * 1000);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  return (
    <div className="table-container">
      <h3 className="table-title">
        {isFlow ? "Flowmeter Sensor Data Table" : "PLC Sensor Data Table"}
      </h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
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
                <th>D_R</th>
                <th>T_L</th>
                <th>A_F</th>
                <th>F_F</th>
                <th>Y_F_T</th>
                <th>Y_O_C</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((row, i) => {
              const timestamp = row?.d_details?.timestamp;
              const { date, time } = isFlow
                ? formatDateAndTime(timestamp, true)
                : formatDateAndTime(timestamp);

              return (
                <tr key={i}>
                  <td>{date}</td>
                  <td>{time}</td>

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
              <td colSpan={isFlow ? 8 : 8} style={{ textAlign: "center" }}>
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
