import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerDevice, resetDeviceState } from '../slices/deviceSlice'
const FormComponent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "", // updated field name
    location: "",
    dateOfJoining: "",
    timeZone: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { add_gatewaylist_error, add_gatewaylist_response } = useSelector((state) => state.registerDevice);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (add_gatewaylist_error) {
      setError(add_gatewaylist_error.response.data.message);
      setTimeout(() => {
        setError([]);
      }, 2000);

      dispatch(resetDeviceState());
    }
    if (add_gatewaylist_response.message === "Device registered successfully") {
      onClose();
      dispatch(resetDeviceState());
    }
  }, [add_gatewaylist_error, add_gatewaylist_response, dispatch, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        deviceId: formData.deviceName,
        devicetype: formData.deviceType,
        location: formData.location,
        dateOfJoining: formData.dateOfJoining,
        timeZone: formData.timeZone,
      }
      dispatch(registerDevice({ data }))
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("API error:", err);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "4px",
    marginBottom: "12px",
    fontSize: "14px",
  };

  const timeZones = Intl.supportedValuesOf("timeZone");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "10px",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "10px",
          width: "360px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
          Add New Device
        </h3>

        <form onSubmit={handleSubmit}>
          <label>Device Name:</label>
          <input
            type="text"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Device Type:</label>
          {/* <input
            type="text"
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            required
            style={inputStyle}
          /> */}
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Device Type</option>
            <option value="plc">PLC</option>
            <option value="flowmeter">Flowmeter</option>
          </select>

          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Time Zone:</label>
          <select
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Time Zone</option>
            {timeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4b0082",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "15px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
