import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerDevice = createAsyncThunk(
  "device/registerDevice",
  async (deviceData, { rejectWithValue }) => {
    try {
      // ✅ Get token from localStorage
      const token = window.localStorage.getItem("token");

      const response = await axios.post(
        "http://65.0.176.7:3030/api/register-device",
        {
          deviceId: deviceData.deviceName,
          devicetype: deviceData.parameter,
          location: deviceData.location,
          dateOfJoining: deviceData.dateOfJoining,
          timeZone: deviceData.timeZone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  Secure token here
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDeviceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerDevice.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register device";
        state.success = false;
      });
  },
});

export const { resetDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer;
