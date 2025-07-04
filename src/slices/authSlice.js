import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN, FORGOTPASS } from "../api/api";

export const userLogin = createAsyncThunk(
  "/",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await LOGIN(data);
      if (response?.data?.success === true) {
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("role", response.data.role);
        window.localStorage.setItem("loggedIn", true);
        navigate("/dashboard");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/forgot",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await FORGOTPASS(data);
      if (response?.data?.success === true) {
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("loggedIn", true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loginData: null,
  token: null,
  status: "",
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("loggedIn"),
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    doLogout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("loggedIn");
      state.token = null;
      state.loginData = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "Loading...";
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.status = "Success";
        state.loading = false;
        state.loginData = payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.status = "Failed";
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "Loading...";
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.status = "Success";
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.status = "Failed";
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { doLogout, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
