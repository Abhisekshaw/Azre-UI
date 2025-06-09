import React, { useState } from 'react';

const FormComponent = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    parameter: '',
    location: '',
    dateOfJoining: '',
  });

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
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '5px',
    marginBottom: '15px',
    fontSize: '16px',
  };

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
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '420px',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h2 style={{ marginBottom: '20px' }}>Add New Device</h2>

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

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4b0082',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
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
