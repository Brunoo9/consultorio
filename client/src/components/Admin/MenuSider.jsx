/* antd */
import { Layout, Menu } from "antd";
import { Icon } from "@iconify/react";
/* react */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
/** css **/
import "./admin.scss";

const MenuSider = ({ menuCollapsed, setMenuCollapsed }) => {
  const { auth } = useSelector((state) => state.auth);

  const { Sider } = Layout;

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <Link className="itemSider" to="/admin">
        Reportes
      </Link>,
      "/admin",
      <Icon height="22" icon="dashicons:chart-pie" />
    ),
    auth.rol === "admin"
      ? getItem(
          <Link className="itemSider" to="doctores">
            Doctores
          </Link>,
          "doctores",
          <Icon height="22" icon="maki:doctor" />
        )
      : "",
    auth.rol === "doctor" || auth.rol === "admin"
      ? getItem(
          "Pacientes",
          "pacientes",
          <Icon height="22" icon="mdi:patient" />,
          [
            getItem(
              <Link className="itemSider" to="pacientes">
                Mis Pacientes
              </Link>,
              "mispacientes"
            ),
            getItem(
              <Link className="itemSider" to="pacientes/cita">
                Cita Paciente
              </Link>,
              "citapaciente"
            ),
          ]
        )
      : "",
    auth.rol === "admin" || auth.rol === "user"
      ? getItem(
          <Link className="itemSider" to="turnos">
            Turnos
          </Link>,
          "turnos",
          <Icon height="22" icon="ic:round-calendar-month" />
        )
      : "",
    auth.rol === "admin"
      ? getItem(
          <Link className="itemSider" to="usuarios">
            Usuarios
          </Link>,
          "usuarios",
          <Icon height="22" icon="clarity:users-solid" />
        )
      : "",
  ];

  return (
    <Sider
      width={200}
      className="site-layout"
      collapsedWidth={0}
      onBreakpoint={(broken) => {
        if (broken) {
          setMenuCollapsed(true);
        } else {
          setMenuCollapsed(false);
        }
      }}
      trigger={null}
      collapsed={menuCollapsed}
      breakpoint="md"
      style={{ backgroundColor: "#1A374D" }}
    >
      <Menu
        theme="dark"
        style={{ backgroundColor: "#1A374D" }}
        mode="inline"
        items={items}
      ></Menu>
    </Sider>
  );
};

export default MenuSider;
