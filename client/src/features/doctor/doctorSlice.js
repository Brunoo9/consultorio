import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import doctorService from "./doctorService";

const initialState = {
  doctors: [],
  doctor: {},
  isError: false,
  isSuccess: false,
};

// Login user
export const getDoctors = createAsyncThunk(
  "doctor/getAll",
  async (thunkAPI) => {
    try {
      return await doctorService.getDoctors();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id, thunkAPI) => {
    try {
      return await doctorService.deleteDoctor(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ id, values }, thunkAPI) => {
    try {
      return await doctorService.updateDoctor(id, values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createDoctor = createAsyncThunk(
  "doctor/create",
  async (values, thunkAPI) => {
    try {
      return await doctorService.createDoctor(values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, { payload }) => {
      state.doctor = payload;
    },
    updateDoctorList: (state, { payload }) => {
      state.doctors = payload;
    },
    reset: (state) => {
      state.doctors = [];
      state.doctor = {};
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctors.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.doctors = payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isError = true;
        state.doctors = null;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export const { reset, updateDoctorList, setDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
