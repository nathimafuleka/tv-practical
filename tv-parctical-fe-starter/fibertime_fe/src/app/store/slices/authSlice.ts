import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  phoneNumber: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; phoneNumber: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.phoneNumber = action.payload.phoneNumber;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.phoneNumber = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
