import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email") || "",
  password: localStorage.getItem("password") || "",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
      state.isAuthenticated = true;

      //save
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.setItem("isAuthenticated", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
