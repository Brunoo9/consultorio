import { useEffect, useState } from "react";
import { Form, Input, Col, Row, Select } from "antd";
import moment from "moment";
import clienteAxios from "../../../config/clienteAxios";
import { openError, openSuccess } from "../../../helpers/notificaciones";

import { useSelector, useDispatch } from "react-redux";
import {
  getPatientsSelect,
  getTipoTurno,
} from "../../../features/selects/selectSlice";

const FormTurnoCreate = ({ form, turno, setModalCreateOpen, forceUpdate }) => {
  const { patientsSelect, tipoTurnos } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  const [tituloTurno, setTituloTurno] = useState(""); // para poder ponerle un titulo al turno
  const { TextArea } = Input;

  useEffect(() => {
    const getSelects = async () => {
      await Promise.all([
        dispatch(getPatientsSelect()),
        dispatch(getTipoTurno()),
      ]);
    };
    getSelects();
  }, []);

  const onFinish = async (values) => {
    const { paciente, observaciones, idtipoturno } = values;

    try {
      const { data } = await clienteAxios.post("/turnos/create", {
        turnStart: moment.utc(turno.startStr),
        turnEnd: moment.utc(turno.endStr),
        doctor: Number(turno.resource.id),
        idtipoturno,
        paciente,
        observaciones,
      });

      openSuccess(data.msg);
      form.resetFields();

      setModalCreateOpen(false);
      forceUpdate();
    } catch (error) {
      openError(error.response?.data.msg);
      console.log(error);
    }
  };

  const onChange = (value, object) => {
    setTituloTurno(object.label);
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
              name="paciente"
              label="Paciente"
              rules={[
                {
                  required: true,
                  message: "Es un Campo obligatorio!",
                },
              ]}
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: "220",
                }}
                options={patientsSelect}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idtipoturno"
              label="Tipo turno"
              rules={[
                {
                  required: true,
                  message: "Es un Campo obligatorio!",
                },
              ]}
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: "220",
                }}
                onChange={onChange}
                options={tipoTurnos}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="observaciones"
              label="Observaciones"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <TextArea
                showCount
                maxLength={200}
                autoSize={{
                  minRows: 4,
                  maxRows: 6,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormTurnoCreate;
