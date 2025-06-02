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
import React from 'react';

const Sidebar = () => (
  <div className="sidebar">
    {/* <h2>SMART HOME</h2> */}
    <ul>
      {/* <li>
        <div className="sidebar-icon">🏠</div>
        <div className="sidebar-label">Smart Home</div>
      </li> */}
       <li>
       <div className="sidebar-icon">📊</div>
<div className="sidebar-label">Dashboard</div>
      </li>
      {/* <li>
        <div className="sidebar-icon">💬</div>
        <div className="sidebar-label">Message</div>
      </li> */}
      {/* <li>
        <div className="sidebar-icon">📟</div>
        <div className="sidebar-label">Devices</div>
      </li> */}
      {/* <li>
        <div className="sidebar-icon">⚙️</div>
        <div className="sidebar-label">Settings</div>
      </li> */}
    </ul>
  </div>
);

export default Sidebar;
