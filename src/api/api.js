import axios from "axios";
import { data } from "react-router-dom";
export const api = axios.create({ baseURL: process.env.REACT_APP_API });

// LOGIN PAGE API
export const LOGIN = (data) => api.post("/api/auth/login", data);
// http://65.0.176.7:3030/api/auth/login

// FORGOT PAGE APIss
export const FORGOTPASS = (data) => api.post("/api/auth/forget-password", data);

// DASHBOARD API
export const DASHBOARD = (data) => api.post("/api/gateway-data/Flowmeter", data);
// http://65.0.176.7:3030/api/gateway-data/Flowmeter

// PLC DASHBOARD API
// export const PLC_DASHBOARD = (data) => api.post("/api/gateway-data/Plc", data);

// http://65.0.176.7:3030/api/gateway-data/Plc