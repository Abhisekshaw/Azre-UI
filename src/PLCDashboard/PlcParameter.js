import React, { useState } from 'react';
import axios from 'axios';

const PlcParameter = ({ filters, onChange }) => {
  const [deviceList, setDeviceList] = useState([]);
  const token = localStorage.getItem("token");
  // Fetch on dropdown open
  const handleDeviceClick = async () => {
    if (deviceList.length === 0) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/gateway-list/Plc`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDeviceList(res.data.data);
      } catch (error) {
        console.error('Error fetching gateway devices:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="filters">
      <select name="device" value={filters.device} onChange={handleChange} onClick={handleDeviceClick}>
        <option value="">--Select device--</option>
        {deviceList.map((gatewayID) => (
          <option key={gatewayID} value={gatewayID}>
            {gatewayID}
          </option>
        ))}
      </select>

      <select name="parameter" value={filters.parameter} onChange={handleChange}>
        <option value="">--Select Parameter--</option>
        <option value="D_R">D_R</option>
        <option value="T_L">T_L</option>
        <option value="A_F">A_F</option>
        <option value="F_F">F_F</option>
        <option value="Y_F_T">Y_F_T</option>
        <option value="Y_O_C">Y_O_C</option>
      </select>
    </div>
  );
};

export default PlcParameter;



