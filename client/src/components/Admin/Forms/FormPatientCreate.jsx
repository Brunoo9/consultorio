import React from "react";
import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Col, Row, Select, Modal } from "antd";
import { openError, openSuccess } from "../../../helpers/notificaciones";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  getPatients,
} from "../../../features/patient/patientSlice";
import {
  getGenders,
  getBloodType,
  getObraSocial,
} from "../../../features/selects/selectSlice";

const FormPatientCreate = ({ form }) => {
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

  const onFinish = async (values) => {
    Modal.confirm({
      title: "Está seguro que desea crear el paciente?",
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        try {
          await dispatch(createPatient(values)).unwrap();

          openSuccess("Paciente creado correctamente!");
          dispatch(getPatients());
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
    <>
      <Form
        name="form-create"
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
              name="telefonoresponsable"
              label="Teléfono responsable"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Input placeholder="Número de teléfono responsable" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              name="obrasocial"
              label="Obra Social"
              rules={[
                {
                  required: true,
                  message: "Si no posee, seleccione opcion 'NO POSEE'",
                },
              ]}
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 220,
                }}
                options={obraSocial}
              />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="tiposangre"
              rules={[{ required: true, message: "Es un campo obligatorio!" }]}
              label="Tipo de Sangre"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 220,
                }}
                options={bloodType}
              />
            </Form.Item>
          </Col> */}
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
    </>
  );
};

export default FormPatientCreate;
