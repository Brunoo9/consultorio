import clienteAxios from "../../config/clienteAxios";

const getUsers = async () => {
  const { data } = await clienteAxios("/users/getall");
  return data;
};
const deleteUser = async (id) => {
  return data;
};
const updateUser = async (id, values) => {
  const { data } = await clienteAxios.put(`/users/update/${id}`, values);
  return data;
};
const createUser = async ({ name, password, rol }) => {
  const { data } = await clienteAxios.post("/users/create", {
    name,
    password,
    rol,
  });
  return data;
};

const userService = {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};

export default userService;
