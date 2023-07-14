import "antd/dist/antd.css";
import { Col, Row, Statistic, Card } from "antd";
import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";

const AdminHome = () => {
  const [countPatient, setCountPatient] = useState(0);
  const [doctor, setDoctor] = useState([]);
  const [countTurno, setCountTurno] = useState(0);

  useEffect(() => {
    const getCountPatients = async () => {
      try {
        const [count, turno, doctor] = await Promise.all([
          clienteAxios("patients/count"),
          clienteAxios("turnos/count"),
          clienteAxios("turnos/getturnobydoctor"),
        ]);

        setCountPatient(count.data.count);
        setCountTurno(turno.data.count);
        setDoctor(doctor.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountPatients();
  }, []);

  const data = doctor.map((doc) => ({
    type: `${doc.nombresdoctor} ${doc.apellidodoctor}`,
    value: doc._count.turnos,
  }));

  const config = {
    appendPadding: 8,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-40%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <h1 className="turnos-titulo">
        Revisa los <span className="turnos-span">reportes</span>
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12} xl={12}>
          <Card>
            <Statistic title="Cantidad de pacientes" value={countPatient} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12} xl={12}>
          <Card>
            <Statistic title="Cantidad de turnos en total" value={countTurno} />
          </Card>
        </Col>
        {/* <Col xs={24} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col> */}
        <Col xs={24} md={24} lg={24} xl={24}>
          <Card>
            <h1>Doctores con mas turnos: </h1>
            <Pie {...config} />;
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminHome;
