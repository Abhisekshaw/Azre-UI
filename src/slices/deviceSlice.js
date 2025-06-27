import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DEVICE_REGISTRATION } from '../api/api';

export const registerDevice = createAsyncThunk(
  "device/registerDevice",
  async ({ data }, { rejectWithValue }) => {
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      };

      const response = await DEVICE_REGISTRATION(
        data, header
      );
      console.log("registration done", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    loading: false,
    error: null,
    success: false,

    add_gatewaylist_response: "",
    add_gatewaylist_error: null,
  },
  reducers: {
    resetDeviceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.add_gatewaylist_response = "";
      state.add_gatewaylist_error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.add_gatewaylist_response = action.payload;
        state.success = true;
      })
      .addCase(registerDevice.rejected, (state, action) => {
        state.loading = false;
        state.add_gatewaylist_error = action.payload || "Failed to register device";
        state.success = false;
      });
  },
});

export const { resetDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer;
