import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Filters from './FilterPanel';
import PowerChart from './PowerChart';
import DataTable from './DataTable';
import axios from 'axios';
import DatePickerComponent from './DatePickerComponent';

const Dashboard = () => {
  const [filters, setFilters] = useState({ time: '', device: '', parameter: '' });
  const [allChartData, setAllChartData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (range) => {
    console.log("Date range changed:", range);
    
    setDateRange(range);
  };

  useEffect(() => {
    const fetchGatewayData = async () => {
      
      if (!dateRange.start || !dateRange.end || !filters.device) return;

      setLoading(true);
      try {
        const response = await axios.post('http://65.0.176.7:3030/api/gateway-data', {
        // const response = await axios.post('http://localhost:8000/api/gateway-data', {
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
  }, [ filters.device]);

  // const filteredChartData = allChartData?.filter((entry) => {
  //   console.log(entry,"_-------+++++++");
    
  //   return (
  //     (!filters.time || entry.time === filters.time.split(' - ')[0]) &&
  //     (!filters.device || entry.device === filters.device)
  //   );
  // });

  // const filteredTableData = allTableData?.filter((entry) => {
  //   return (
  //     (!filters.time || entry.time === filters.time) &&
  //     (!filters.device || entry.device === filters.device)
  //   );
  // });

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <div className="top-bar">
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
            Hi, Jasica! Good Evening...<br />
            <span style={{ fontWeight: 'normal' }}>
              Welcome Home, it's snowing outside stay safe
            </span>
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
            12 May 2022<br />
            -15°C &nbsp; | &nbsp; 10:23 PM
          </div>
        </div>

        {/* Date Picker Component */}
        <DatePickerComponent onDateChange={handleDateChange} />

        {/* Filter Panel (time, device, parameter) */}
        <Filters filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error !== '--Select Parameter--' && (
          <>
          <PowerChart data={allTableData} selectedParameter={filters.parameter} />
            {/* <PowerChart data={filteredChartData} parameter={filters.parameter} /> */}
            {/* <DataTable data={filteredTableData} parameter={filters.parameter} /> */}
          </>
        )}
        <DataTable data={allTableData} />
      </main>
    </div>
  );
};

export default Dashboard;
