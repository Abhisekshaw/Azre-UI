import axios from "axios";
export const api = axios.create({ baseURL: process.env.REACT_APP_API });

// LOGIN PAGE API
export const LOGIN = (data) => api.post("/api/auth/login", data);

// FORGOT PAGE APIss
export const FORGOTPASS = (data) => api.post("/api/auth/forget-password", data);

// DASHBOARD API
export const DASHBOARD = (data,header) => api.post("/api/gateway-data/Flowmeter", data, header);

// PLC DASHBOARD API
export const PLC_DASHBOARD = (data,header) => api.post("/api/gateway-data/Plc", data ,header);

// DEVICE REGISTRATION
export const DEVICE_REGISTRATION = (data,header) => api.post("/api/register-device", data, header);