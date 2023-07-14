import { Modal, Form } from "antd";
import FormUserEdit from "../Forms/FormUserEdit";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/user/userSlice";

const ModalEditUser = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setModalOpen(false);
    dispatch(setUser({}));
  };

  const onOk = () => {
    Modal.confirm({
      title: "Está seguro que desea editar el usuario?",
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
      title="Edición de usuario"
      onOk={onOk}
      open={modalOpen}
      onCancel={handleCancel}
      okText="Actualizar"
      cancelText="Cancelar"
      centered={true}
    >
      <FormUserEdit form={form} />
    </Modal>
  );
};

export default ModalEditUser;
