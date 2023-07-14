import React from "react";
import { Modal, Form, Drawer, Button } from "antd";
import FormPatientCreate from "../Forms/FormPatientCreate";

const ModalCreatePatient = ({ modalCreate, handleStateCreate }) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title="Creación de paciente"
      width={500}
      onClose={() => handleStateCreate(false)}
      open={modalCreate}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Button type="primary" onClick={form.submit}>
          Crear Paciente
        </Button>
      }
    >
      <FormPatientCreate form={form} />
    </Drawer>
  );
};

export default ModalCreatePatient;
