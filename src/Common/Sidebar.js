import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate('/')}>
          <div className="sidebar-icon">📊</div>
          <div className="sidebar-label">Flow Meter Dashboard</div>
        </li>
        <li onClick={() => navigate('/PLCdashboard')}>
          <div className="sidebar-icon">📊</div>
          <div className="sidebar-label">PLC Dashboard</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
