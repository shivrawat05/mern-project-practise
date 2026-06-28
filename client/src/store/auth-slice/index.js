import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return error.response?.data?.message || "Registration failed";
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return error.response?.data?.message || "Login failed";
    }
  },
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5001/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    return response.data;
  },
);
export const checkAuth = createAsyncThunk("/auth/check", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-cache, no-cache, must-revalidate, proxy-revalidate",
          Expires: "0",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false };
  }
});

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // console.log("registerUser pending", state);
        console.log(state.payload);
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success || false;
        state.user = action.payload.user || null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
