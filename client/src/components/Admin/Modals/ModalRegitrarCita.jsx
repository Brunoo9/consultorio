import { Form, Modal, Typography, Col, Row } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import FormRegistrarCita from "../Forms/FormRegistrarCita";

const ModalRegitrarCita = ({
  event,
  infoTurno,
  modalCreate,
  handleStateCreate,
}) => {
  const { Title, Text } = Typography;
  return (
    <Modal
      title="Registro de cita"
      //   onOk={onOk}
      width={700}
      open={modalCreate}
      onCancel={() => handleStateCreate(false)}
      okText="Registrar Cita"
      cancelText="Cancelar"
      centered={true}
    >
      <Row gutter={20}>
        <Col span={12}>
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
                {moment.utc(infoTurno?.turnEnd).format("LT")}
                <br />
                {infoTurno?.observaciones ? (
                  <>
                    <Text underline strong>
                      Observaciones:
                    </Text>
                    {infoTurno?.observaciones}
                  </>
                ) : (
                  ""
                )}
              </blockquote>
            </pre>
          </Typography>
        </Col>

        <Col span={12}>
          <FormRegistrarCita />
        </Col>
      </Row>

      {/* <FormTurnoCreate
        form={form}
        turno={turno}
        setTurno={setTurno}
        setModalCreateOpen={setModalCreateOpen}
        forceUpdate={forceUpdate}
      /> */}
    </Modal>
  );
};

export default ModalRegitrarCita;
