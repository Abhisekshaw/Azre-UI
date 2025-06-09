// import React from 'react';


// const Sidebar = () => (
//   <div className="sidebar">
//     <h2>SMART HOME</h2>
//     <ul>
//       <li>🏠 Dashboard</li>
//       <li>💬 Message</li>
//       <li>📟 Devices</li>
//       <li>⚙️ Settings</li>
//     </ul>
//   </div>
// );

// export default Sidebar;
// import React from 'react';

// const Sidebar = () => (
//   <div className="sidebar">
//     {/* <h2>SMART HOME</h2> */}
//     <ul>
      
//        <li>
//           <div className="sidebar-icon">📊</div>
//             <div className="sidebar-label">Dashboard</div>
//       </li>
//        <li>
//         <div className="sidebar-icon">📊</div>
//           <div className="sidebar-label">PLC Dashboard</div>
//       </li>
     
//     </ul>
//   </div>
// );

// export default Sidebar;
// Sidebar.js
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
