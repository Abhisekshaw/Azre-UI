import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlcData = createAsyncThunk(
  "plc/fetchPlcData",
  async ({ data }, { rejectWithValue }) => {
    console.log({data},"+++++++++");
    try {
      //  Step 1: Retrieve token from localStorage
      const token = window.localStorage.getItem("token");

      //Step 2: Prepare the request body
      const requestBody = {
        start: Math.floor(new Date(data.start).getTime() / 1000),
        end: Math.floor(new Date(data.end).getTime() / 1000),
        device: data.device,
      };

      const response = await axios.post(
        "http://65.0.176.7:3030/api/gateway-data/Plc",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({response});
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
