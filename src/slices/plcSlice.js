import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PLC_DASHBOARD } from '../api/api';
import axios from "axios";

export const fetchPlcData = createAsyncThunk(
  "plc/fetchPlcData",
  async ({ data }, { rejectWithValue }) => {
    try {
      //  Step 1: Retrieve token from localStorage
      const token = window.localStorage.getItem("token");

      //Step 2: Prepare the request body
      const requestBody = {
        start: Math.floor(new Date(data.start).getTime() / 1000),
        end: Math.floor(new Date(data.end).getTime() / 1000),
        devices: data.devices,
      };

      const response = await PLC_DASHBOARD(
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);

const plcSlice = createSlice({
  name: "plc",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlcData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlcData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlcData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default plcSlice.reducer;
