import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, setUserAndToken)
      .addCase(logIn.fulfilled, setUserAndToken)
      .addCase(logOut.fulfilled, resetUserAndToken)
      .addCase(refreshUser.pending, setRefreshing)
      .addCase(refreshUser.fulfilled, refreshUserSuccess)
      .addCase(refreshUser.rejected, refreshUserRejected);
  },
});

// Reducer functions
const setUserAndToken = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const resetUserAndToken = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const setRefreshing = state => {
  state.isRefreshing = true;
};

const refreshUserSuccess = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const refreshUserRejected = state => {
  state.isRefreshing = false;
};

export const authReducer = authSlice.reducer;
