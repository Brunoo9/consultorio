/* react-router-dom */
import { useNavigate } from "react-router-dom";

/* ant design  */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
/* others */
import { openSuccess, openError } from "../../helpers/notificaciones";
import { useSelector, useDispatch } from "react-redux";
import { login, profile } from "../../features/auth/authSlice";
import { useEffect } from "react";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserDeatails = async () => {
      try {
        await dispatch(profile());
        if (isError) return;
        navigate("/admin");
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    if (localStorage.getItem("token")) getUserDeatails();
  }, []);

  const onFinish = async (values) => {
    const { username, password } = values;

    const data = await dispatch(login({ name: username, pw: password }));
    if (data.error) return openError(data.payload);

    openSuccess(data.payload.msg);
    navigate("/admin");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      size="large"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "El nombre de usuario es requerido" },
          {
            min: 3,
            message: "El nombre de usuario debe tener minimo 3 caracteres",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre de usuario"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "La contraseña es requerida" },
            { min: 6, message: "La contraseña debe tener minimo 6 caracteres" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Contraseña"
          />
        </Form.Item>

        {/* <Link className="login-form-forgot" to="#">
            Olvidé la contraseña
        </Link> */}
      </Form.Item>
      {/* <Alert message="Usuario: pepe, Password: asd123" type="info" /> */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
