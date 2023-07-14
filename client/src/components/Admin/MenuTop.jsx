import React from "react";
import logo from "../../assets/logo.png";
import { Menu, Dropdown, Space, Image, message } from "antd";
import {
  LockOutlined,
  MenuOutlined,
  UserOutlined,
  PoweroffOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./admin.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = (e) => {
    if (e.key === "2") {
      dispatch(logout());

      navigate("/");
    } else {
      message.info("Próximamente");
    }
  };
  const menu = (
    <Menu
      items={[
        {
          label: "Cambiar contraseña",
          key: "1",
          icon: <LockOutlined />,
        },

        {
          label: "Cerrar sesión",
          key: "2",
          icon: <PoweroffOutlined />,
        },
      ]}
      onClick={handleButtonClick}
    />
  );
  return (
    <>
      <div className="menu-top__left">
        <div className="div-image">
          <Image src={logo} preview={false} width={45} />
          <span className="div-image__logo">Consultorio Médico</span>
        </div>
      </div>
      <div className="menu-top__right">
        {React.createElement(MenuOutlined, {
          className: "trigger",
          onClick: () => setMenuCollapsed(!menuCollapsed),
        })}
        <Dropdown overlay={menu} trigger={["click"]} theme={"dark"}>
          <a className="menu-top__a" onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              Hola, {auth.nombreusuario}
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </>
  );
};

export default MenuTop;
