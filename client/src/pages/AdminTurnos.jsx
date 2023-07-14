import React from "react";
import { Select } from "antd";
import Calendar from "../components/Admin/Calendar";
const AdminTurnos = () => {
  return (
    <div>
      <h1 className="turnos-titulo">
        Agenda los <span className="turnos-span">turnos</span>
      </h1>

      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default AdminTurnos;
