
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch('http://65.0.176.7:3030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'user' }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Login failed');
      }

      // Optional: store token in localStorage
      localStorage.setItem('authToken', data.token);

      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
