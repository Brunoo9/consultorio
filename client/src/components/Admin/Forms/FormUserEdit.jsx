import { useEffect, useState } from "react";
import { Form, Input, Col, Row, Select } from "antd";
import { openError, openSuccess } from "../../../helpers/notificaciones";
import { useSelector, useDispatch } from "react-redux";
import { getRols } from "../../../features/selects/selectSlice";
import { getUsers, updateUser } from "../../../features/user/userSlice";

const FormUserEdit = ({ form }) => {
  const { user } = useSelector((state) => state.user);
  const { rols } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSelects = async () => await dispatch(getRols());
    getSelects();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      nombreusuario: user.nombreusuario,
      idrol: user.idrol,
    });
  }, [user]);

  const onFinish = async (values) => {
    console.log(user.key);
    try {
      dispatch(updateUser({ id: user.key, values }));

      openSuccess("Usuario actualizado correctamente!");
      dispatch(getUsers());
    } catch (error) {
      console.log(error);
      openError(error.response?.data.msg);
    }
  };

  return (
    <Form
      name="basic"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item style={{ marginBottom: "0" }}>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              name="nombreusuario"
              rules={[
                { required: true, message: "Es un campo obligatorio!" },
                {
                  pattern: new RegExp("^[A-Za-z-' ']+$"),
                  message: "No es un nombre válido",
                },
              ]}
              label="Nombre usuario"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Input placeholder="Nombre del usuario" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idrol"
              rules={[{ required: true, message: "Es un campo obligatorio!" }]}
              label="Rol"
              style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
            >
              <Select
                style={{
                  width: 230,
                }}
                // onChange={handleChange}
                options={rols}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormUserEdit;
