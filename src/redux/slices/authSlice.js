import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signUp } from '../../services/userService';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signIn(email, password);
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error.message);
      return rejectWithValue(error.message); // Pass the error message for rejection
    }
  }
);

// Async thunk for registration
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signUp(email, password);
      console.log('Registration successful:', data);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Registration error:', error.message);
      return rejectWithValue(error.message); // Pass the error message for rejection
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
