import { Modal, Form, Drawer, Button } from "antd";
import FormDoctorCreate from "../Forms/FormDoctorCreate";

const ModalCreateDoctor = ({ modalCreate, handleStateCreate }) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title="Creación de doctor"
      width={500}
      onClose={() => handleStateCreate(false)}
      open={modalCreate}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Button type="primary" onClick={form.submit}>
          Crear doctor
        </Button>
      }
    >
      <FormDoctorCreate form={form} />
    </Drawer>
  );
};

export default ModalCreateDoctor;
