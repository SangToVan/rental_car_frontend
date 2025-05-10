import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  isLogin,
  removeLoginInfo,
  setRefreshToken,
  setToken,
  setUser,
} from "../services/storageService";

const initialState = {
  isAuthenticated: isLogin(),
  user: getUser(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUpdatedUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = updatedUser;
      setUser(updatedUser);
    },
    login: (state, action) => {
      const { user, access_token, refresh_token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      setToken(access_token);
      setRefreshToken(refresh_token);
      setUser(user);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      removeLoginInfo();
    },
  },
});

export const { setUpdatedUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
