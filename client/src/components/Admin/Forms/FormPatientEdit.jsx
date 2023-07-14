import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Col, Row, Select } from "antd";
import moment from "moment";
import clienteAxios from "../../../config/clienteAxios";
import { openError, openSuccess } from "../../../helpers/notificaciones";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePatient,
  getPatients,
} from "../../../features/patient/patientSlice";
import {
  getGenders,
  getBloodType,
  getObraSocial,
} from "../../../features/selects/selectSlice";

const FormPatientEdit = ({ form, handleStateEdit }) => {
  const { patient } = useSelector((state) => state.patient);
  const { genders, bloodType, obraSocial } = useSelector(
    (state) => state.select
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getSelects = async () => {
      await Promise.all([
        dispatch(getGenders()),
        dispatch(getBloodType()),
        dispatch(getObraSocial()),
      ]);
    };
    getSelects();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      key: patient.id,
      nombres: patient.nombres,
      apellidos: patient.apellidos,
      idsexo: patient.idsexo,
      obrasocial: patient.idobrasocial,
      //   numobrasocial: patient.numobrasocial,
      // tiposangre: patient.idtiposangre,
      nrodocumento: patient.nrodocumento,
      fechaNac: moment(patient.fechaNac, "YYYY/MM/DD"),
      direccion: patient.direccion,
      telefono: patient.telefono,
      telefonoresponsable: patient.telefonoresponsable,
      correo: patient.correo,
      //   provincia: patient.provincia,
      //   localidad: patient.localidad,
      // codigopostal: patient.codigopostal,
    });
  }, [patient]);

  const onFinish = async (values) => {
    try {
      dispatch(updatePatient({ id: patient.key, values }));
      openSuccess("Paciente actualizado correctamente!");
      dispatch(getPatients());
      handleStateEdit(false);
    } catch (error) {
      openError(error.message);
      console.log(error);
    }
  };

  return (
    <Form
      name="form-edit"
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
              name="nombres"
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
              name="apellidos"
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
          <Col span={8}>
            <Form.Item
              name="fechaNac"
              rules={[{ required: true, message: "Es un campo obligatorio!" }]}
              label="Fecha de nacimiento"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <DatePicker placement={"topLeft"} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="nrodocumento"
              rules={[
                { required: true, message: "Es un campo obligatorio!" },
                {
                  pattern: new RegExp("^[0-9]+$"),
                  message: "No es un documento válido",
                },
                { max: 8, message: "Máximo 8 dígitos!" },
              ]}
              label="Núm. documento"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Input placeholder="Número de documento" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="idsexo"
              rules={[{ required: true, message: "Es un campo obligatorio!" }]}
              label="Sexo"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 120,
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
              name="telefonoresponsable"
              label="Teléfono responsable"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Input placeholder="Número de teléfono responsable" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              name="obrasocial"
              label="Obra Social"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 120,
                }}
                options={obraSocial}
              />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="tiposangre"
              rules={[{ required: true, message: "Campo requerido!" }]}
              label="Tipo de Sangre"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 120,
                }}
                options={bloodType}
              />
            </Form.Item>
          </Col> */}
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

export default FormPatientEdit;
