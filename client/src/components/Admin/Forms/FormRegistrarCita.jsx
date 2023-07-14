import { Form, Input, Col, Row, Select } from "antd";

const FormRegistrarCita = () => {
  const { TextArea } = Input;

  return (
    <Form
      name="basic"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      layout="vertical"
      requiredMark={false}
      //   form={form}
      //   onFinish={onFinish}
    >
      <Form.Item
        name="motivo"
        label="Motivo de la consulta"
        style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
      >
        <TextArea
          showCount
          maxLength={200}
          autoSize={{
            minRows: 2,
            maxRows: 2,
          }}
        />
      </Form.Item>
      <Form.Item
        name="tratamiento"
        label="Tratamiento / Observaciones"
        style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
      >
        <TextArea
          showCount
          maxLength={200}
          autoSize={{
            minRows: 2,
            maxRows: 2,
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default FormRegistrarCita;
