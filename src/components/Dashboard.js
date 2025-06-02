// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import Filters from './FilterPanel';
// import PowerChart from './PowerChart';
// import DataTable from './DataTable';
// import axios from 'axios';
// import DatePickerComponent from './DatePickerComponent';

// const Dashboard = () => {
//   const [filters, setFilters] = useState({ time: '', device: '', parameter: '' });
//   const [allChartData, setAllChartData] = useState([]);
//   const [allTableData, setAllTableData] = useState([]);
//   const [dateRange, setDateRange] = useState({ start: null, end: null });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const now = new Date();
//   const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);


//   // Format date as, for example: 30 May 2025
//   const options = { day: 'numeric', month: 'long', year: 'numeric' };
//   const formattedDate = now.toLocaleDateString(undefined, options);

//   // Format time as 10:23 PM (12-hour format)
//   const formattedTime = now.toLocaleTimeString(undefined, {
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   });
//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (range) => {
//     console.log("Date range changed:", range);
    
//     setDateRange(range);
//   };

//   useEffect(() => {
//     const fetchGatewayData = async () => {
      
//       if (!dateRange.start || !dateRange.end || !filters.device) return;

//       setLoading(true);
//       try {
//         const response = await axios.post('http://65.0.176.7:3030/api/gateway-data', {
//         // const response = await axios.post('http://localhost:8000/api/gateway-data', {
//           start: Math.floor(new Date(dateRange.start).getTime() / 1000),
//           end: Math.floor(new Date(dateRange.end).getTime() / 1000),
//           device: filters.device
//         });

//         setAllChartData(response?.data || []);
//         setAllTableData(response?.data || []);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch gateway data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGatewayData();
//   }, [ filters.device]);

//   // const filteredChartData = allChartData?.filter((entry) => {
//   //   console.log(entry,"_-------+++++++");
    
//   //   return (
//   //     (!filters.time || entry.time === filters.time.split(' - ')[0]) &&
//   //     (!filters.device || entry.device === filters.device)
//   //   );
//   // });

//   // const filteredTableData = allTableData?.filter((entry) => {
//   //   return (
//   //     (!filters.time || entry.time === filters.time) &&
//   //     (!filters.device || entry.device === filters.device)
//   //   );
//   // });
// const [currentIstDate, setCurrentIstDate] = useState(new Date());

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const utc = now.getTime() + now.getTimezoneOffset() * 60000;
//       const istOffset = 5.5 * 60 * 60000; // IST offset in ms
//       setCurrentIstDate(new Date(utc + istOffset));
//     };

//     updateTime();
//     const intervalId = setInterval(updateTime, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const istDateString = currentIstDate.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });

//   const istTimeString = currentIstDate.toLocaleTimeString('en-IN', {
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   });

//   const hour = currentIstDate.getHours();
//   let greeting = 'Hi Jasica, Good Evening';
//   if (hour >= 5 && hour < 12) {
//     greeting = 'Hi Jasica, Good Morning';
//   } else if (hour >= 12 && hour < 17) {
//     greeting = 'Hi Jasica, Good Afternoon';
//   }

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <main>
//         <div className="top-bar">
//           <input type="text" placeholder="Search using keywords or name..." />
//           <div className="user">
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="User"
//               style={{
//                 width: '30px',
//                 height: '30px',
//                 borderRadius: '50%',
//                 marginRight: '8px',
//                 objectFit: 'cover'
//               }}
//             />
//             Jasica Williamson
//           </div>
//         </div>

//         <div style={{ position: 'relative', width: '100%' }}>
//           <img
//             src="https://media.istockphoto.com/id/476098860/vector/wonderful-morning-in-the-blue-mountains.jpg?s=612x612&w=0&k=20&c=0nuLvsWKXPReu01RvbXTKIwlUYxOQvoXD_qVBrsapxc="
//             alt="Background"
//             style={{
//               height: '150px',
//               width: '100%',
//               objectFit: 'cover',
//               borderRadius: '15px'
//             }}
//           />
//           <div
//             style={{
//               position: 'absolute',
//               top: '20px',
//               left: '20px',
//               color: 'black',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               lineHeight: '1.5'
//             }}
//           >
//             {greeting}
//             <br />
//             <span style={{ fontWeight: 'normal' }}>
//               {/* Welcome Home, it's snowing outside stay safe */}
//             </span>
//           </div>
//           <div
//             style={{
//               position: 'absolute',
//               top: '20px',
//               right: '20px',
//               color: 'black',
//               fontSize: '14px',
//               textAlign: 'right'
//             }}
//           >
//             {formattedDate} <br />
//             &nbsp; {formattedTime}
//           </div>
//         </div>

//         {/* Date Picker Component */}
//         <DatePickerComponent onDateChange={handleDateChange} />

//         {/* Filter Panel (time, device, parameter) */}
//         <Filters filters={filters} onChange={handleFilterChange} />

//         {loading && <p>Loading data...</p>}
//         {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//         {!loading && !error !== '--Select Parameter--' && (
//           <>
//           <PowerChart data={allTableData} selectedParameter={filters.parameter} />
//             {/* <PowerChart data={filteredChartData} parameter={filters.parameter} /> */}
//             {/* <DataTable data={filteredTableData} parameter={filters.parameter} /> */}
//           </>
//         )}
//         <DataTable data={allTableData} />
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Filters from './FilterPanel';
import PowerChart from './PowerChart';
import DataTable from './DataTable';
import axios from 'axios';
import DatePickerComponent from './DatePickerComponent';
import FormComponent from './FormComponent'; // Import your form

const Dashboard = () => {
  const [filters, setFilters] = useState({ time: '', device: '', parameter: '' });
  const [allChartData, setAllChartData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [currentIstDate, setCurrentIstDate] = useState(new Date());

  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      setCurrentIstDate(new Date(utc + istOffset));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const istDateString = currentIstDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const istTimeString = currentIstDate.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const hour = currentIstDate.getHours();
  let greeting = 'Hi Jasica, Good Evening';
  if (hour >= 5 && hour < 12) greeting = 'Hi Jasica, Good Morning';
  else if (hour >= 12 && hour < 17) greeting = 'Hi Jasica, Good Afternoon';

  useEffect(() => {
    const fetchGatewayData = async () => {
      if (!dateRange.start || !dateRange.end || !filters.device) return;
      setLoading(true);
      try {
        const response = await axios.post('http://65.0.176.7:3030/api/gateway-data', {
          start: Math.floor(new Date(dateRange.start).getTime() / 1000),
          end: Math.floor(new Date(dateRange.end).getTime() / 1000),
          device: filters.device
        });

        setAllChartData(response?.data || []);
        setAllTableData(response?.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch gateway data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGatewayData();
  }, [filters.device, dateRange]);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        {/* <div className="top-bar">
          <input type="text" placeholder="Search using keywords or name..." />
          <div className="user">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginRight: '8px',
                objectFit: 'cover'
              }}
            />
            Jasica Williamson
          </div>
        </div> */}
             {/* <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <input
    type="text"
    placeholder="Search using keywords or name..."
    style={{
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '14px',
      width: '300px'
    }}
  />
  
  <div className="user-profile" style={{
    display: 'flex',
    alignItems: 'center',
    background: '#f9f9f9',
    padding: '8px 12px',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }}>
    <img
      src="https://i.pravatar.cc/150?img=68"
      alt="User"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #4b0082',
        marginRight: '10px'
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>
        Jasica Williamson
      </span>
      span style={{ fontSize: '12px', color: '#888' }}>
        Sr. Energy Analyst
      </span>
    </div>
  </div>
</div> */}

<div
  className="top-bar"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    background: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }}
>
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search using keywords or name..."
    style={{
      padding: '10px 16px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '300px',
      outline: 'none',
    }}
  />

  {/* Right Side - User Auth Buttons or Profile */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    {/* Uncomment based on login status */}
    
    {/* 🔒 When Logged OUT */}
    <button
      style={{
        background: 'transparent',
        border: '1px solid #4b0082',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#4b0082',
        cursor: 'pointer',
      }}
    >
      Login
    </button>
    <button
      style={{
        background: '#4b0082',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#fff',
        cursor: 'pointer',
      }}
    >
      Sign Up
    </button>

    {/* ✅ When Logged IN */}
    {/* 
    <div
      className="user-profile"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f9f9f9',
        padding: '8px 12px',
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <img
        src="https://i.pravatar.cc/150?img=68"
        alt="User"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #4b0082',
          marginRight: '10px',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>
          Jasica Williamson
        </span>
        <span style={{ fontSize: '12px', color: '#888' }}>
          Sr. Energy Analyst
        </span>
      </div>
    </div>
    */}
  </div>
</div>

   


        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src="https://media.istockphoto.com/id/476098860/vector/wonderful-morning-in-the-blue-mountains.jpg?s=612x612&w=0&k=20&c=0nuLvsWKXPReu01RvbXTKIwlUYxOQvoXD_qVBrsapxc="
            alt="Background"
            style={{
              height: '150px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '15px'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              color: 'black',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '1.5'
            }}
          >
            {greeting}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'black',
              fontSize: '14px',
              textAlign: 'right'
            }}
          >
            {formattedDate} <br />
            {formattedTime}
          </div>
        </div>

        {/* Date Picker + Add Device Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <DatePickerComponent onDateChange={handleDateChange} />
  <div style={{ flex: 1 }} /> {/* Spacer */}
  <button
    onClick={() => setShowAddDeviceForm(true)}
    style={{
      padding: '10px 15px',
      backgroundColor: '#4b0082',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: 'auto' // Pushes to the right
    }}
  >
    Add Device
  </button>
</div>


        {/* Filter Panel */}
        <Filters filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <>
            <PowerChart data={allTableData} selectedParameter={filters.parameter} />
          </>
        )}
        <DataTable data={allTableData} />

        {/* Add Device Modal */}
        {showAddDeviceForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '10px',
              position: 'relative',
              width: '400px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
              <button
                onClick={() => setShowAddDeviceForm(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ✖
              </button>
              <FormComponent onClose={() => setShowAddDeviceForm(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
