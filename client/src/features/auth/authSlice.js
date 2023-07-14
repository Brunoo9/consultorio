import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  auth: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login auth
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});
export const profile = createAsyncThunk(
  "auth/profile",
  async (user, thunkAPI) => {
    try {
      return await authService.profile(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.msg;
        state.auth = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.auth = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.auth = null;
        state.isLoading = false;
        state.message = null;
        state.isError = false;
      })
      .addCase(profile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.auth = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.auth = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
