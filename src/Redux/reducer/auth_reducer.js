import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Almacena los detalles del usuario autenticado
  isAuthenticated: false, // Indica si el usuario está autenticado
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;