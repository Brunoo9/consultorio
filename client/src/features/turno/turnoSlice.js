import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import turnoService from "./turnoService";
const initialState = {
  eventsByDoctor: [],
  isError: false,
  isSuccess: false,
};

export const getEventsByDoctor = createAsyncThunk(
  "eventsByDoctor/getAll",
  async (id, thunkAPI) => {
    try {
      return await turnoService.getEventsByDoctor(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const turnoSlice = createSlice({
  name: "turno",
  initialState,
  reducers: {
    reset: (state) => {
      state.eventsByDoctor = [];
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventsByDoctor.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.eventsByDoctor = payload;
    });
  },
});

export const { reset } = turnoSlice.actions;
export default turnoSlice.reducer;
