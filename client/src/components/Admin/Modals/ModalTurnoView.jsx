import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Typography } from "antd";

import moment from "moment";
import clienteAxios from "../../../config/clienteAxios";
import { openError, openSuccess } from "../../../helpers/notificaciones";
const ModalTurnoView = ({
  drawerOpen,
  setDrawerOpen,
  infoTurno,
  event,
  setInfoTurno,
}) => {
  const { confirm } = Modal;
  const { Title, Text } = Typography;

  const handleCancel = () => {
    setDrawerOpen(false);
    setInfoTurno({});
  };

  const turnDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(`turnos/delete/${id}`, config);
      openSuccess(data?.msg);
    } catch (error) {
      openError(error.response?.data.msg);
      console.log(error);
    }
  };
  //*TODO:  hacerlo con un state global al show confirm, con un context */
  const showConfirm = () => {
    confirm({
      title: "Estás seguro que deseas eliminar este turno?",
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        turnDelete(Number(event._def.publicId));
        event.remove();
        setDrawerOpen(false);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onOk = () => {
    showConfirm();
  };

  return (
    <Modal
      title="Vista del Turno"
      onOk={onOk}
      open={drawerOpen}
      onCancel={handleCancel}
      okText="Eliminar turno"
      cancelText="Cancelar"
      centered={true}
    >
      <Typography>
        <pre>
          <Title level={5}>Información turno: </Title>
          <blockquote>
            <Text underline strong>
              Tipo de turno:
            </Text>{" "}
            {infoTurno?.tituloturno}
            <br />
            <Text underline strong>
              Paciente:
            </Text>{" "}
            {infoTurno?.nombrepaciente}
            <br />
            <Text underline strong>
              Doctor:
            </Text>{" "}
            {infoTurno?.nombredoctor}
            <br />
            <Text underline strong>
              Especialidad:
            </Text>{" "}
            {infoTurno?.especialidad}
            <br />
            <Text underline strong>
              Fecha:
            </Text>{" "}
            {moment.utc(infoTurno?.turnStart).format("DD/MM/YYYY")} <br />
            <Text underline strong>
              De:
            </Text>{" "}
            {moment.utc(infoTurno?.turnStart).format("LT")}{" "}
            <Text underline strong>
              Hasta:
            </Text>{" "}
            {moment.utc(infoTurno?.turnEnd).format("LT")} <br />
            <Text underline strong>
              Observaciones:
            </Text>{" "}
            {infoTurno?.observaciones}
          </blockquote>
        </pre>
      </Typography>
    </Modal>
  );
};

export default ModalTurnoView;
