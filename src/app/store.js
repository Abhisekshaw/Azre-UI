import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import plcReducer from "../slices/plcSlice";
import flowReducer from "../slices/flowSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plc: plcReducer,
    flow: flowReducer,
  },
});
