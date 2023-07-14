import { useEffect, useState } from "react";
import { Table, Space, Button, Tooltip, Tag } from "antd";
import { Icon } from "@iconify/react";
import ModalEditUser from "../components/Admin/Modals/ModalEditUser";
import clienteAxios from "../config/clienteAxios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, setUser } from "../features/user/userSlice";

const AdminUsuarios = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const color = {
    admin: "red",
    doctor: "blue",
    user: "green",
  };
  const showModal = (record, tipo) => {
    dispatch(setUser(record));
    setModalOpen(true);
  };
  const columns = [
    {
      title: "Nombre usuario",
      dataIndex: "nombreusuario",
      // ...getColumnSearchProps("nombres"),
      // render: (e, record) => `${record.nombres} ${record.apellidos}`,
    },
    {
      title: "Rol",
      dataIndex: "rol",
      align: "center",
      render: (_, { rol }) => {
        return (
          <>
            <Tag color={color[rol]}>{rol.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Acciones",
      key: "action",

      render: (e, record) => (
        <Space size="middle">
          <Tooltip placement="top" title="Editar usuario">
            <Button
              className="iconTable"
              onClick={() => {
                showModal(record);
              }}
            >
              <Icon icon="dashicons:edit-large" height="25" color="#555" />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title="Eliminar usuario">
            <Button
              className="iconTable"
              // onClick={() => {
              //   showConfirm(record);
              // }}
            >
              <Icon icon="dashicons:trash" height="25" color="#555" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <h1 className="turnos-titulo">
        Administra los <span className="turnos-span">Usuarios</span>
      </h1>
      <main className="main-usuarios">
        <Table columns={columns} dataSource={users} />
      </main>
      <ModalEditUser modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default AdminUsuarios;
