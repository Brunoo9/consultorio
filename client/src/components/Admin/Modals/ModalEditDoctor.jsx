import React from "react";
import { Modal, Form } from "antd";
import FormDoctorEdit from "../Forms/FormDoctorEdit";
import { setDoctor } from "../../../features/doctor/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
const ModalEditDoctor = ({ modalEdit, handleStateEdit }) => {
  const { doctor } = useSelector((state) => state.doctor);
  const [form] = Form.useForm();

  const handleCancel = () => {
    handleStateEdit(false);
    setDoctor({});
  };

  const onOk = () => {
    Modal.confirm({
      title: "Está seguro que desea editar el doctor?",
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
      title="Edición de doctor"
      onOk={onOk}
      open={modalEdit}
      onCancel={handleCancel}
      okText="Actualizar"
      cancelText="Cancelar"
      centered={true}
    >
      <FormDoctorEdit
        form={form}
        setDoctor={setDoctor}
        handleStateEdit={handleStateEdit}
      />
    </Modal>
  );
};

export default ModalEditDoctor;
