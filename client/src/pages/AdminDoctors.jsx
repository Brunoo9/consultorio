import { useEffect, useState, useRef } from "react";
import useModalActive from "../hooks/useModalActive";

import { Button, Space, Table, Tooltip, Modal, Drawer } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Icon } from "@iconify/react";
import ModalViewDoctor from "../components/Admin/Modals/ModalViewDoctor";
import ModalEditDoctor from "../components/Admin/Modals/ModalEditDoctor";
import ModalCreateDoctor from "../components/Admin/Modals/ModalCreateDoctor";
import { openError, openSuccess } from "../helpers/notificaciones";
import "./pages.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteDoctor,
  getDoctors,
  setDoctor,
  updateDoctorList,
} from "../features/doctor/doctorSlice";

const AdminDoctors = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);
  const [
    { modalView, modalEdit, modalCreate },
    { handleStateView, handleStateEdit, handleStateCreate },
  ] = useModalActive();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const { confirm } = Modal;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Buscar por nombre`}
  //         value={selectedKeys[0]}
  //         onChange={(e) => {
  //           setSelectedKeys(e.target.value ? [e.target.value] : []);
  //           handleSearch(selectedKeys, confirm, dataIndex);
  //           if (e.target.value === "") {
  //             setSearchText("");
  //           }
  //         }}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <Tooltip placement="top" title={"Buscar"}>
  //       <SearchOutlined
  //         style={{
  //           color: filtered ? "#1890ff" : undefined,
  //         }}
  //       />
  //     </Tooltip>
  //   ),
  //   onFilter: (value, record) => {
  //     const nombreCompleto = `${record[dataIndex]} ${record["apellidos"]}`;

  //     return nombreCompleto
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase());
  //   },

  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  // });

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const columns = [
    {
      title: "Nombre completo",
      dataIndex: "nombres",
      // ...getColumnSearchProps("nombres"),
      render: (e, record) => `${record.nombresdoctor} ${record.apellidodoctor}`,
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "Especialidad",
      dataIndex: "nombreespecialidad",
    },
    {
      title: "Acciones",
      key: "action",

      render: (e, record) => (
        <Space size="middle">
          {/* se podria optimizar esta parte, sacando los button y haciendo lo de react.component */}
          <Tooltip placement="top" title={"Ver doctor"}>
            <Button
              className="iconTable"
              onClick={() => {
                showModal(record, "view");
              }}
            >
              <Icon icon="dashicons:visibility" height="23" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title={"Editar doctor"}>
            <Button
              className="iconTable"
              onClick={() => {
                showModal(record, "edit");
              }}
            >
              <Icon icon="dashicons:edit-large" height="22" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title={"Eliminar doctor"}>
            <Button
              className="iconTable"
              onClick={() => {
                showConfirm(record);
              }}
            >
              <Icon icon="dashicons:trash" height="22" color="#555" />
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

    dispatch(setDoctor(record));
  };

  const showConfirm = (record) => {
    confirm({
      title: "Estás seguro que deseas Eliminar este doctor?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "Cancelar",
      okText: "Eliminar",
      centered: true,
      async onOk() {
        // Eliminar el paciente
        try {
          const { payload } = await dispatch(deleteDoctor(record.key));

          const updateList = doctors.filter(
            (doctor) => doctor.key !== record.key
          );
          openSuccess(payload.msg);
          dispatch(updateDoctorList(updateList));
        } catch (error) {
          openError(error.response?.data.msg);
          console.log(error);
        }
      },

      onCancel() {},
    });
  };
  return (
    <>
      <h1 className="turnos-titulo">
        Administra los <span className="turnos-span">doctores</span>
      </h1>
      <div className="button-patients">
        <Button
          className="button"
          icon={<PlusOutlined />}
          onClick={() => {
            handleStateCreate(true);
          }}
        >
          Crear doctor
        </Button>
      </div>

      <Table columns={columns} dataSource={doctors} />

      <ModalViewDoctor
        modalView={modalView}
        handleStateView={handleStateView}
      />
      <ModalEditDoctor
        modalEdit={modalEdit}
        handleStateEdit={handleStateEdit}
      />
      <ModalCreateDoctor
        modalCreate={modalCreate}
        handleStateCreate={handleStateCreate}
      />
    </>
  );
};

export default AdminDoctors;
