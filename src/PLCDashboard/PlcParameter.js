import React, { useState } from 'react';
import axios from 'axios';

const  PlcParameter= ({ filters, onChange }) => {
  const [deviceList, setDeviceList] = useState([]);

  // Fetch on dropdown open
  const handleDeviceClick = async () => {
    if (deviceList.length === 0) {
      try {
        const res = await axios.get('http://65.0.176.7:3030/api/gateway-list/Plc'); 
        
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
        <option value="Pb">D_R</option>
        <option value="Tb">T_L</option>
        <option value="VmT">A_F</option>
        <option value="VbT">F_F</option>
        <option value="Qb">Y_F_T</option>
        <option value="BatR">Y_O_C</option>
      </select>
    </div>
  );
};

export default PlcParameter;



