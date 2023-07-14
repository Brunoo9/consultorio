import "antd/dist/antd.css";
import { Layout, Divider, Image } from "antd";
import FormLogin from "../components/Admin/FormLogin";
import "./pages.scss";
import logo from "../assets/logo.png";

const AdminSignin = () => {
  const { Content } = Layout;

  return (
    <Layout className="signing">
      <Content className="signing__content">
        <div className="signing__content-tabs">
          <div className="logo">
            <Image width={100} src={logo} preview={false} />
            <span className="logo__span">Consultorio Médico</span>
          </div>
          <Divider />

          <FormLogin />
        </div>
      </Content>
    </Layout>
  );
};

export default AdminSignin;
