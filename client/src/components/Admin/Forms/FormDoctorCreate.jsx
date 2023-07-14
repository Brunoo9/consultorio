import { useEffect } from "react";
import {
  DatePicker,
  Form,
  Input,
  Col,
  Row,
  Select,
  Divider,
  Modal,
} from "antd";
import { openError, openSuccess } from "../../../helpers/notificaciones";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor, getDoctors } from "../../../features/doctor/doctorSlice";
import { createUser } from "../../../features/user/userSlice";
import {
  getGenders,
  getEspecialities,
} from "../../../features/selects/selectSlice";

const FormDoctorCreate = ({ form }) => {
  const dispatch = useDispatch();
  const { genders, especialities } = useSelector((state) => state.select);

  useEffect(() => {
    const getSelects = async () =>
      await Promise.all([dispatch(getGenders()), dispatch(getEspecialities())]);
    getSelects();
  }, []);

  const onFinish = (values) => {
    const { username, password } = values;
    Modal.confirm({
      title: "Está seguro que desea crear el doctor?",
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        try {
          // si o si tengo que usar el await para poder acceder a la respuesta del id del usuario
          // para luego poder enlazarlo con el doctor
          const { idusuario } = await dispatch(
            createUser({
              name: username,
              password: password,
              rol: 3, //rol doctor
            })
          ).unwrap();

          values.usuario = idusuario; // agrego al usuario creado para enlazarlo con el doctor
          dispatch(createDoctor(values));

          form.resetFields();

          openSuccess("Usuario creado correctamente");

          dispatch(getDoctors());
        } catch (error) {
          openError(error);
        }
      },

      onCancel() {
        return;
      },
    });
  };

  return (
    <Form
      name="form-doctor"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={6}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="Nombre de usuario"
            rules={[
              {
                required: true,
                message: "El nombre de usuario es requerido",
              },
              {
                min: 3,
                message: "El nombre de usuario debe tener minimo 3 caracteres",
              },
            ]}
            style={{ fontWeight: "bold" }}
          >
            <Input placeholder="Nombre de usuario" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "La contraseña es requerida" },
              {
                min: 6,
                message: "La contraseña debe tener minimo 6 caracteres",
              },
            ]}
            style={{ fontWeight: "bold" }}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
        </Col>
      </Row>

      <Divider style={{ marginTop: 0 }} />

      <Row gutter={6}>
        <Col span={12}>
          <Form.Item
            name="nombresdoctor"
            rules={[
              { required: true, message: "Es un campo obligatorio!" },
              {
                pattern: new RegExp("^[A-Za-z-' '\u00C0-\u017F]+$"),
                message: "No es un nombre válido",
              },
            ]}
            label="Nombres"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
          >
            <Input placeholder="Nombres del paciente" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="apellidodoctor"
            rules={[
              { required: true, message: "Es un campo obligatorio!" },
              {
                pattern: new RegExp("^[A-Za-z-' ']+$"),
                message: "No es un apellido válido",
              },
            ]}
            label="Apellidos"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
          >
            <Input placeholder="Apellidos del paciente" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={6}>
        <Col span={12}>
          <Form.Item
            name="fechanacimiento"
            rules={[{ required: true, message: "Es un campo obligatorio!" }]}
            label="Fecha de nacimiento"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
          >
            <DatePicker placement={"topLeft"} style={{ width: 220 }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="idsexo"
            rules={[{ required: true, message: "Es un campo obligatorio!" }]}
            label="Sexo"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
          >
            <Select
              style={{
                width: 230,
              }}
              options={genders}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={6}>
        <Col span={12}>
          <Form.Item
            name="telefono"
            label="Teléfono"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            rules={[
              {
                pattern: new RegExp("^[0-9]+$"),
                message: "No es un teléfono válido",
              },
              { max: 10, message: "Máximo 10 dígitos!" },
            ]}
          >
            <Input placeholder="Número de teléfono" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="idespecialidad"
            rules={[{ required: true, message: "Es un campo obligatorio!" }]}
            label="Especialidad"
            style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
          >
            <Select
              style={{
                width: 230,
              }}
              options={especialities}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="correo"
        label="Email"
        rules={[{ type: "email", message: "Debe ingresar un mail válido" }]}
        style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
      >
        <Input placeholder="Correo electrónico" />
      </Form.Item>

      <Form.Item
        name="direccion"
        label="Domiclio"
        style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
      >
        <Input placeholder="Domicilio del paciente" />
      </Form.Item>
    </Form>
  );
};

export default FormDoctorCreate;
