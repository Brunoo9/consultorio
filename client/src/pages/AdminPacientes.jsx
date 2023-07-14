import { useEffect, useState, useRef } from "react";
import useModalActive from "../hooks/useModalActive";
import "antd/dist/antd.css";
import { Button, Space, Table, Tooltip, Input, Modal, message } from "antd";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import "./pages.scss";
import ModalViewPatient from "../components/Admin/Modals/ModalViewPatient";
import ModalEditPatient from "../components/Admin/Modals/ModalEditPatient";
import ModalCreatePatient from "../components/Admin/Modals/ModalCreatePatient";
import { openError, openSuccess } from "../helpers/notificaciones";
import {
  deletePatient,
  getPatients,
  updatePatientList,
  setPatient,
  getPatientsByDoctor,
} from "../features/patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";
const AdminPacientes = () => {
  const [
    { modalView, modalEdit, modalCreate },
    { handleStateView, handleStateEdit, handleStateCreate },
  ] = useModalActive(); // visibilidad de los modales
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { patients, patient, patientsByDoctor } = useSelector(
    (state) => state.patient
  );
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { confirm } = Modal;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar por nombre`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleSearch(selectedKeys, confirm, dataIndex);
            if (e.target.value === "") {
              setSearchText("");
            }
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <Tooltip placement="top" title={"Buscar"}>
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      </Tooltip>
    ),
    onFilter: (value, record) => {
      const nombreCompleto = `${record[dataIndex]} ${record["apellidos"]}`;

      return nombreCompleto
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  useEffect(() => {
    if (auth.iddoctor) {
      dispatch(getPatientsByDoctor(auth.iddoctor));
    } else {
      dispatch(getPatients());
    }
  }, []);

  const columns = [
    {
      title: "Nombre completo",
      dataIndex: "nombres",
      ...getColumnSearchProps("nombres"),
      render: (e, record) => `${record.nombres} ${record.apellidos}`,
    },
    {
      title: "Nro. Documento",
      dataIndex: "nrodocumento",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
    },
    {
      title: "Acciones",
      key: "action",

      render: (e, record) => (
        <Space size="middle">
          {/* se podria optimizar esta parte, sacando los button y haciendo lo de react.component */}
          <Tooltip placement="top" title={"Ver paciente"}>
            <Button
              className="iconTable"
              onClick={() => {
                showModal(record, "view");
              }}
            >
              <Icon icon="dashicons:visibility" height="23" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title={"Editar Paciente"}>
            <Button
              className="iconTable"
              onClick={() => {
                showModal(record, "edit");
              }}
            >
              <Icon icon="dashicons:edit-large" height="22" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title={"Eliminar Paciente"}>
            <Button
              className="iconTable"
              onClick={() => {
                showConfirm(record);
              }}
            >
              <Icon icon="dashicons:trash" height="22" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title={"Ver Historia Clínica"}>
            <Button
              className="iconTable"
              onClick={() => message.info("Próximamente")}
            >
              <Icon icon="dashicons:media-default" height="22" color="#555" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showModal = (record, tipo) => {
    if (tipo === "view") {
      handleStateView(true);
    } else if (tipo === "edit") {
      handleStateEdit(true);
    }
    dispatch(setPatient(record));
  };

  const showConfirm = (record) => {
    confirm({
      title: "¿Está seguro que desea eliminar este paciente?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "Cancelar",
      okText: "Eliminar",
      centered: true,
      async onOk() {
        // Eliminar el paciente
        try {
          const { payload } = await dispatch(deletePatient(record.key));

          const updateList = patients.filter(
            (patient) => patient.key !== record.key
          );
          openSuccess(payload.msg);
          dispatch(updatePatientList(updateList));
        } catch (error) {
          console.log(error);
        }
      },

      onCancel() {},
    });
  };

  return (
    <>
      <h1 className="turnos-titulo">
        Administra tus <span className="turnos-span">pacientes</span>
      </h1>
      <div className="button-patients">
        <Button
          className="button"
          icon={<PlusOutlined />}
          onClick={() => handleStateCreate(true)}
        >
          Crear paciente
        </Button>
      </div>
      {auth.iddoctor ? (
        <Table columns={columns} dataSource={patientsByDoctor} />
      ) : (
        <Table columns={columns} dataSource={patients} />
      )}

      <ModalViewPatient
        modalView={modalView}
        handleStateView={handleStateView}
      />
      <ModalEditPatient
        modalEdit={modalEdit}
        handleStateEdit={handleStateEdit}
      />
      <ModalCreatePatient
        modalCreate={modalCreate}
        handleStateCreate={handleStateCreate}
      />
    </>
  );
};

export default AdminPacientes;
