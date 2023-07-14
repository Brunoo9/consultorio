import { Modal, Form } from "antd";
import FormPatientEdit from "../Forms/FormPatientEdit";
import { useDispatch } from "react-redux";
import { setPatient } from "../../../features/patient/patientSlice";
const ModalEditPatient = ({ modalEdit, handleStateEdit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    handleStateEdit(false);
    dispatch(setPatient({}));
  };

  const onOk = () => {
    Modal.confirm({
      title: "¿Está seguro que desea editar el paciente?",
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
      title="Edición de paciente"
      onOk={onOk}
      open={modalEdit}
      onCancel={handleCancel}
      okText="Actualizar"
      cancelText="Cancelar"
      centered={true}
    >
      <FormPatientEdit form={form} handleStateEdit={handleStateEdit} />
    </Modal>
  );
};

export default ModalEditPatient;
