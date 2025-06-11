import React, { useState, useEffect } from 'react';

const FormComponent = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    parameter: '',
    location: '',
    dateOfJoining: '',
    timeZone: '',
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.pointerEvents = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '4px',
    marginBottom: '12px',
    fontSize: '14px',
  };

  const timeZones = Intl.supportedValuesOf('timeZone');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '10px',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '10px',
          width: '360px',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Add New Device</h3>

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

          <label>Parameter:</label>
          <input
            type="text"
            name="parameter"
            value={formData.parameter}
            onChange={handleChange}
            required
            style={inputStyle}
          />

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

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4b0082',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '10px',
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
