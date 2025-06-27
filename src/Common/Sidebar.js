import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate('/')}>
          <div className="sidebar-icon">📊</div>
          <div className="sidebar-label">FMS Dashboard</div>
        </li>
        <li onClick={() => navigate('/PLCdashboard')}>
          <div className="sidebar-icon">📊</div>
          <div className="sidebar-label">ODO Web Dashboard</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
