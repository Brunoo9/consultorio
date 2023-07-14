import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import clienteAxios from "../../config/clienteAxios";
import { openError, openSuccess } from "../../helpers/notificaciones";

const FormRegister = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { name, password } = values;

    try {
      const { data } = await clienteAxios.post("/users/create", {
        name,
        password,
      });

      openSuccess(data?.msg);
      form.resetFields();
    } catch (error) {
      openError(error.response?.data.msg);
    }
  };

  // const onFinish = async (values) => {
  //   const { name, email, password } = values

  //   try {
  //     const { data } = await clienteAxios.post('/users',{
  //       name,
  //       email,
  //       pw: password
  //     })

  //     console.log(data.msg);
  //   } catch (error) {
  //     console.log(error.response.data.msg);
  //   }
  // };
  return (
    <Form
      form={form}
      className=""
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "El nombre de usuario es obligatorio" },
          {
            min: 3,
            message: "El nombre de usuario debe tener minimo 3 caracteres",
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre de usuario"
        />
      </Form.Item>

      {/* 
    <Form.Item
      name=""
      rules={[
        {required: true, message: "Please input your Email!"},
        // {type: 'email',message: 'Ingrese un mail válido'}
      ]}
      hasFeedback
    >
      
      <Input
        prefix={<MailOutlined  className="site-form-item-icon" />}
        placeholder="Correo electrónico"
      />

    </Form.Item> */}

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Campo obligatorio" },
          { min: 6, message: "La contraseña debe tener minimo 6 caracteres" },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Contraseña"
        />
      </Form.Item>

      <Form.Item
        name="repeatPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Campo obligatorio!" },
          { min: 6, message: "La contraseña debe tener minimo 6 caracteres" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Las contraseñas no coinciden"));
            },
          }),
        ]}
        hasFeedback // para que aparezca el tip verde cuando esta todo ok
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Repetir contraseña"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
