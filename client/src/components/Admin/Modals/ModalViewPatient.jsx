import {
  Modal,
  Descriptions,
  Col,
  Divider,
  Drawer,
  Row,
  Typography,
} from "antd";
import moment from "moment";
import calcularEdad from "../../../helpers/calcularEdad";
import "./modals.scss";
import { useSelector } from "react-redux";
const DescriptionItem = ({ title, content }) => {
  return (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
};
const ModalViewPatient = ({ modalView, handleStateView }) => {
  const { patient } = useSelector((state) => state.patient);
  const { Title } = Typography;

  const {
    nombres,
    apellidos,
    direccion,
    nrodocumento,
    sexo,
    obrasocial,
    fechaNac,
    telefono,
    correo,
    numobrasocial,
  } = patient;

  const handleCancel = () => {
    handleStateView(false);
  };

  return (
    <Drawer
      width={500}
      title={"Datos Paciente"}
      placement="left"
      onClose={handleCancel}
      open={modalView}
    >
      <Title level={5} className="site-description-item-profile-title">
        Información personal
      </Title>
      <Row>
        <Col span={17}>
          <DescriptionItem
            title="Nombre completo"
            content={`${nombres} ${apellidos}`}
          />
        </Col>
        <Col span={7}>
          <DescriptionItem title="DNI" content={nrodocumento} />
        </Col>
      </Row>
      <Row>
        <Col span={17}>
          <DescriptionItem
            title="Fecha Nacimiento"
            content={`${moment.utc(fechaNac).format("DD-MM-YYYY")}`}
          />
        </Col>

        <Col span={7}>
          <DescriptionItem
            title="Edad"
            content={`${calcularEdad(fechaNac)} años`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Sexo" content={sexo} />
        </Col>

        <Col span={12}>
          <DescriptionItem title="Obra Social" content={obrasocial} />
        </Col>
      </Row>

      <Divider style={{ borderTop: "1.5px solid rgba(0, 0, 0, 0.20)" }} />
      <Title level={5} className="site-description-item-profile-title">
        Datos de contacto
      </Title>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Direccion" content={direccion} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="E-mail" content={correo} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Télefono" content={telefono} />
        </Col>
      </Row>
    </Drawer>
  );
};

export default ModalViewPatient;
