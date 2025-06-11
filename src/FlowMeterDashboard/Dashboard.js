import React, { useState, useEffect } from 'react';
import Sidebar from '../Common/Sidebar';
import Filters from '../FlowMeterDashboard/FilterPanel';
import DatePickerComponent from '../Common/DatePickerComponent';
import FormComponent from '../Common/FormComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SensorDataTable from "../Common/SensorDataTable";
import DynamicLineChart from '../Common/DynamicLineChart';
const Dashboard = () => {
  const [filters, setFilters] = useState({ time: '', device: '', parameter: '' });
  const [allChartData, setAllChartData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
    greeting: ''
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedDate = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const greeting = hours < 12 ? 'Hi, Good Morning' : hours < 17 ? 'Hi, Good Afternoon' : 'Hi, Good Evening';

  useEffect(() => {
    const fetchGatewayData = async () => {
      if (!dateRange.start || !dateRange.end || !filters.device) return;
      setLoading(true);
      try {
        const response = await axios.post('http://65.0.176.7:3030/api/gateway-data/Flowmeter', {
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
        {/* Top bar and greeting */}
        <div className="top-bar">
          <input type="text" placeholder="Search using keywords or name..." />
          <div
            className="user"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img src="https://i.pravatar.cc/40" alt="User" />
            {showDropdown && (
              <div className="dropdown-menu">
                <div>Profile</div>
                <div>Settings</div>
                <div
                  onClick={() => {
                    localStorage.removeItem('isAuthenticated');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background */}
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
            {formattedDate}
            <br />
            {formattedTime}
          </div>
        </div>

        {/* Date picker and Add Device */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <DatePickerComponent onDateChange={handleDateChange} />
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setShowAddDeviceForm(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4b0082',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            Add Device
          </button>
        </div>

        {/* Filters */}
        <Filters filters={filters} onChange={handleFilterChange} />

        {/* Loading and Error Messages */}
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Chart */}
        <DynamicLineChart data={allTableData} selectedParameter={filters.parameter} sourceType="flow" />
        <SensorDataTable data={{ data: allTableData }} type="flow" />    
        {/* Add Device Form */}
        {showAddDeviceForm && (
          <div
            style={{
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
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '10px',
                position: 'relative',
                width: '400px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            >
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
