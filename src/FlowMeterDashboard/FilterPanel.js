/**
 * The Filters component in React renders three dropdown select elements for time, device, and
 * parameter with corresponding options and onChange event handler.
 * @returns The `Filters` component is being returned. It is a functional component in React that
 * displays three select dropdowns for filtering time, device, and parameter. The component takes two
 * props: `filters` which contains the current filter values, and `onChange` which is a function to
 * handle changes in the filters.
 */
import React, { useState } from 'react';
import axios from 'axios';

const Filters = ({ filters, onChange }) => {
  const [deviceList, setDeviceList] = useState([]);
 const token = localStorage.getItem("token");
  // Fetch on dropdown open
  const handleDeviceClick = async () => {
    if (deviceList.length === 0) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/gateway-list/Flowmeter`,
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
        <option value="Pb">Pb</option>
        <option value="Tb">Tb</option>
        <option value="VmT">VmT</option>
        <option value="VbT">VbT</option>
        <option value="Qb">Qb</option>
        <option value="BatR">BatR</option>
      </select>
    </div>
  );
};

export default Filters;



