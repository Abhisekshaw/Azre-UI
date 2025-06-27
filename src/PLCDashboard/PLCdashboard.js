import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";
import PlcParameter from "../PLCDashboard/PlcParameter";
import SensorDataTable from "../Common/SensorDataTable";
import DynamicLineChart from "../Common/DynamicLineChart";
import DatePickerComponent from "../Common/DatePickerComponent";
import FormComponent from "../Common/FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlcData } from "../slices/plcSlice";
import { doLogout } from "../slices/authSlice";
const PLCdashboard = () => {
  const [filters, setFilters] = useState({
    time: "",
    device: "",
    parameter: "",
  });
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [currentIstDate, setCurrentIstDate] = useState(new Date());
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const plcState = useSelector((state) => state.plc);

  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleFilterChange = useCallback((e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleDateChange = useCallback((range) => {
    setDateRange(range);
  }, []);
  const handleLogout = () => {
    dispatch(doLogout());
    navigate("/login");
  };

  // const hour = currentIstDate.getHours();
  let greeting = "Good Evening, Welcome to PLC Dashboard";
  // if (hour >= 5 && hour < 12) greeting = "Good Morning,Welcome to PLC Dashboard";
  // else if (hour >= 12 && hour < 17) greeting = "Good Afternoon,Welcome to PLC Dashboard";

  useEffect(() => {
    if (dateRange.start && dateRange.end && filters.device) {
      const data = {
        start: dateRange.start,
        end: dateRange.end,
        devices: filters.device,
      };
      dispatch(fetchPlcData({ data }));
    }
  }, [filters.device, dateRange, dispatch]);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
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
                {/* <div onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/login'; }}>Logout</div> */}
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "relative", width: "100%" }}>
          <img
            src="https://media.istockphoto.com/id/476098860/vector/wonderful-morning-in-the-blue-mountains.jpg?s=612x612&w=0&k=20&c=0nuLvsWKXPReu01RvbXTKIwlUYxOQvoXD_qVBrsapxc="
            alt="Background"
            style={{
              height: "150px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              lineHeight: "1.5",
            }}
          >
            {greeting}
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "black",
              fontSize: "14px",
              textAlign: "right",
            }}
          >
            {formattedDate}
            <br />
            {formattedTime}
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <DatePickerComponent onDateChange={handleDateChange} />
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setShowAddDeviceForm(true)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#4b0082",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            Add Device
          </button>
        </div>

        <PlcParameter filters={filters} onChange={handleFilterChange} />

        {plcState.loading && <p>Loading data...</p>}
        {plcState.error && (
          <p style={{ color: "red" }}>Error: {plcState.error}</p>
        )}
        {!plcState.loading && !plcState.error && (
          <DynamicLineChart
            data={plcState.data}
            selectedParameter={filters.parameter}
            sourceType="plc"
          />
        )}

        <SensorDataTable data={{ data: plcState.data.data }} type="plc" />

        {showAddDeviceForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                position: "relative",
                width: "400px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <button
                onClick={() => setShowAddDeviceForm(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
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

export default PLCdashboard;
