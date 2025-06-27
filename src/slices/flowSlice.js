import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DASHBOARD } from '../api/api';

export const fetchFlowData = createAsyncThunk(
  'flow/fetchFlowData',
  async ({ data }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await DASHBOARD(data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      return response.data;
    } catch (error) {
      console.log({ error });
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
        state.error = null;
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
