/* Ant design */
import "antd/dist/antd.css";
import { Layout } from "antd";
/* Components  */
import MenuSider from "../components/Admin/MenuSider";
import MenuTop from "../components/Admin/MenuTop";
import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
/* */
import { useSelector } from "react-redux";
import { profile } from "../features/auth/authSlice";
const LayoutAdmin = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content } = Layout;

  const { auth } = useSelector((state) => state.auth);
  return (
    <>
      {auth?.idusuario ? (
        <Layout className="width">
          <Header className="header" style={{ backgroundColor: "#645CAA" }}>
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>

          <Layout>
            <MenuSider
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />

            <Layout>
              <Content className="content">
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutAdmin;
