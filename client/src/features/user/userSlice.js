import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  user: {},
  isError: false,
  isSuccess: false,
};

// Login user
export const getUsers = createAsyncThunk("user/getAll", async (thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, values }, thunkAPI) => {
    try {
      return await userService.updateUser(id, values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createUser = createAsyncThunk(
  "user/create",
  async (values, thunkAPI) => {
    try {
      return await userService.createUser(values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    updateUserList: (state, { payload }) => {
      state.users = payload;
    },
    reset: (state) => {
      state.users = [];
      state.user = {};
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.users = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export const { reset, updateUserList, setUser } = userSlice.actions;
export default userSlice.reducer;
