import { Form, Modal, Typography } from "antd";
import FormTurnoCreate from "../Forms/FormTurnoCreate";
import moment from "moment";

const ModalTurnoCreate = ({
  turno,
  setTurno,
  modalCreateOpen,
  setModalCreateOpen,

  forceUpdate,
}) => {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const handleCancel = () => {
    setModalCreateOpen(false);
  };

  const onOk = () => {
    Modal.confirm({
      title: "Está seguro que desea crear el turno?",
      centered: true,
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk() {
        form.submit();
      },

      onCancel() {},
    });
  };

  return (
    <Modal
      title="Creación de Turno"
      onOk={onOk}
      open={modalCreateOpen}
      onCancel={handleCancel}
      okText="Crear"
      cancelText="Cancelar"
      centered={true}
    >
      <Typography>
        <pre>
          <Title level={5}>Detalle Turno: </Title>
          Fecha: {moment.utc(turno.startStr).format("DD/MM/YYYY")} <br />
          Hora turno: {moment.utc(turno.startStr).format("LT")} <br />
          Hora finalización del Turno: {moment.utc(turno.endStr).format("LT")}
        </pre>
      </Typography>

      <FormTurnoCreate
        form={form}
        turno={turno}
        setTurno={setTurno}
        setModalCreateOpen={setModalCreateOpen}
        forceUpdate={forceUpdate}
      />
    </Modal>
  );
};

export default ModalTurnoCreate;
