import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminSignin from "./pages/AdminSignin";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AdminHome from "./pages/AdminHome";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPacientes from "./pages/AdminPacientes";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminTurnos from "./pages/AdminTurnos";
import "./App.scss";
import AdminCitaPaciente from "./pages/AdminCitaPaciente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminSignin />} />

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="doctores" element={<AdminDoctors />} />
          {/* <Route path="doctores/calendario" element={ <AdminDoctorsCalendar /> }/> */}
          <Route path="pacientes" element={<AdminPacientes />} />
          <Route path="pacientes/cita" element={<AdminCitaPaciente />} />
          <Route path="turnos" element={<AdminTurnos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
