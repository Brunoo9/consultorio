import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientService from "./patientService";

const initialState = {
  patients: [],
  patientsByDoctor: [],
  patient: {},
  isError: false,
  isSuccess: false,
};

export const getPatients = createAsyncThunk(
  "patient/getAll",
  async (thunkAPI) => {
    try {
      return await patientService.getPatients();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getPatientsByDoctor = createAsyncThunk(
  "patientsByDoctor/getAll",
  async (id, thunkAPI) => {
    try {
      return await patientService.getPatientsByDoctor(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id, thunkAPI) => {
    try {
      return await patientService.deletePatient(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePatient = createAsyncThunk(
  "patient/update",
  async ({ id, values }, thunkAPI) => {
    try {
      return await patientService.updatePatient(id, values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createPatient = createAsyncThunk(
  "patient/create",
  async (values, thunkAPI) => {
    try {
      return await patientService.createPatient(values);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, { payload }) => {
      state.patient = payload;
    },
    updatePatientList: (state, { payload }) => {
      state.patients = payload;
    },
    reset: (state) => {
      state.patients = [];
      state.patient = {};
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPatients.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.patients = payload;
      })

      .addCase(getPatientsByDoctor.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.patientsByDoctor = payload;
      });
  },
});

export const { reset, updatePatientList, setPatient } = patientSlice.actions;
export default patientSlice.reducer;
