import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import selectService from "./selectService";

const initialState = {
  rols: [],
  genders: [],
  especialities: [],
  bloodType: [],
  obraSocial: [],
  patientsSelect: [],
  doctorsSelect: [],
  tipoTurnos: [],
  usersSelect: [],
  events: [],
  isError: false,
  isSuccess: false,
};

export const getRols = createAsyncThunk("rols/getAll", async (thunkAPI) => {
  try {
    return await selectService.getRols();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getGenders = createAsyncThunk(
  "genders/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getGenders();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getEspecialities = createAsyncThunk(
  "especialities/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getEspecialities();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getBloodType = createAsyncThunk(
  "bloodType/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getBloodType();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getObraSocial = createAsyncThunk(
  "obraSocial/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getObraSocial();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getPatientsSelect = createAsyncThunk(
  "patientSelect/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getPatientsSelect();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getTipoTurno = createAsyncThunk(
  "tipoTurno/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getTipoTurno();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUserSelects = createAsyncThunk(
  "userSelects/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getUserSelects();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getEvents = createAsyncThunk("events/getall", async (thunkAPI) => {
  try {
    return await selectService.getEvents();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getDoctorsSelect = createAsyncThunk(
  "doctorsSelect/getall",
  async (thunkAPI) => {
    try {
      return await selectService.getDoctorsSelect();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRols.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.rols = payload;
      })
      .addCase(getGenders.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.genders = payload;
      })
      .addCase(getEspecialities.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.especialities = payload;
      })
      .addCase(getBloodType.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.bloodType = payload;
      })
      .addCase(getObraSocial.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.obraSocial = payload;
      })
      .addCase(getPatientsSelect.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.patientsSelect = payload;
      })
      .addCase(getTipoTurno.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.tipoTurnos = payload;
      })
      .addCase(getUserSelects.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.usersSelect = payload;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.events = payload;
      })
      .addCase(getDoctorsSelect.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.doctorsSelect = payload;
      });
  },
});

export const { reset } = selectSlice.actions;
export default selectSlice.reducer;
