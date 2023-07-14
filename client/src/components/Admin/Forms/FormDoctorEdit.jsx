import { useEffect } from "react";
import { DatePicker, Form, Input, Col, Row, Select } from "antd";
import moment from "moment";
import { openError, openSuccess } from "../../../helpers/notificaciones";
import { useSelector, useDispatch } from "react-redux";
import {
  getGenders,
  getEspecialities,
} from "../../../features/selects/selectSlice";
import { getDoctors, updateDoctor } from "../../../features/doctor/doctorSlice";

const FormDoctorEdit = ({ form, handleStateEdit }) => {
  const { doctor } = useSelector((state) => state.doctor);
  const { genders, especialities } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSelects = async () => {
      await Promise.all([dispatch(getGenders()), dispatch(getEspecialities())]);
    };
    getSelects();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      key: doctor.key,
      nombresdoctor: doctor.nombresdoctor,
      apellidodoctor: doctor.apellidodoctor,
      idsexo: doctor.idsexo,
      fechanacimiento: moment(doctor.fechanacimiento, "YYYY/MM/DD"),
      direccion: doctor.direccion,
      telefono: doctor.telefono,
      correo: doctor.correo,
      idespecialidad: doctor.idespecialidad,
    });
  }, [doctor]);

  const onFinish = async (values) => {
    try {
      dispatch(updateDoctor({ id: doctor.key, values }));
      openSuccess("Doctor actualizado correctamente!");
      dispatch(getDoctors());
      handleStateEdit(false);
    } catch (error) {
      openError(error.response?.data.msg);
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item style={{ marginBottom: "0" }}>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              name="nombresdoctor"
              rules={[
                { required: true, message: "Es un campo obligatorio!" },
                {
                  pattern: new RegExp("^[A-Za-z-' ']+$"),
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
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              name="fechanacimiento"
              rules={[{ required: true, message: "Es un campo obligatorio!" }]}
              label="Fecha de nacimiento"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <DatePicker placement={"topLeft"} style={{ width: 230 }} />
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
                // onChange={handleChange}
                options={genders}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
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
      </Form.Item>

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

export default FormDoctorEdit;
