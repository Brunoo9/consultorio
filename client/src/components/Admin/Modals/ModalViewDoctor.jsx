import {
  Modal,
  Descriptions,
  Col,
  Divider,
  Drawer,
  Row,
  Typography,
} from "antd";
import "./modals.scss";
import moment from "moment";
import { useSelector } from "react-redux";

const DescriptionItem = ({ title, content }) => {
  return (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
};

const ModalViewDoctor = ({ modalView, handleStateView }) => {
  const { doctor } = useSelector((state) => state.doctor);
  const { Title } = Typography;

  const {
    key,
    nombresdoctor,
    apellidodoctor,
    fechanacimiento,
    correo,
    telefono,
    direccion,
    sexo,
    nombreespecialidad,
  } = doctor;

  const handleCancel = () => {
    handleStateView(false);
  };

  return (
    <Drawer
      width={500}
      title={"Datos Doctor"}
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
            content={`${nombresdoctor} ${apellidodoctor}`}
          />
        </Col>
        <Col span={7}>
          <DescriptionItem title="Sexo" content={sexo} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Fecha Nacimiento"
            content={`${moment.utc(fechanacimiento).format("DD-MM-YYYY")}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Especialidad" content={nombreespecialidad} />
        </Col>
      </Row>

      <Divider style={{ borderTop: "1.5px solid rgba(0, 0, 0, 0.20)" }} />
      <Title level={5} className="site-description-item-profile-title">
        Datos de contacto
      </Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Direccion" content={direccion} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="E-mail" content={correo} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Télefono" content={telefono} />
        </Col>
      </Row>
    </Drawer>
  );
};

export default ModalViewDoctor;
