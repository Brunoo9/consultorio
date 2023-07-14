import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import patientReducer from "../features/patient/patientSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import userReducer from "../features/user/userSlice";
import selectReducer from "../features/selects/selectSlice";
import turnoReducer from "../features/turno/turnoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    user: userReducer,
    select: selectReducer,
    turno: turnoReducer,
  },
});
