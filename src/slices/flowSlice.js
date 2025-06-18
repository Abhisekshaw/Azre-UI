import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DASHBOARD } from '../api/api';

export const fetchFlowData = createAsyncThunk(
  'flow/fetchFlowData',
  async ({ start, end, device }, thunkAPI) => {
    try {
      if (!start || !end || !device) {
        return thunkAPI.rejectWithValue("Missing required parameters.");
      }

      const token = window.localStorage.getItem("token");

      const response = await DASHBOARD({
        start,
        end,
        device,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!Array.isArray(response.data)) {
        return thunkAPI.rejectWithValue("Invalid data format received");
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch Flowmeter data"
      );
    }
  }
);

const flowSlice = createSlice({
  name: 'flow',
  initialState: {
    chartData: [],
    tableData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlowData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
        state.tableData = action.payload;
      })
      .addCase(fetchFlowData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.chartData = [];
        state.tableData = [];
      });
  },
});

export default flowSlice.reducer;
