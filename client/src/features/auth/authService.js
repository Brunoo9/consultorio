import clienteAxios from "../../config/clienteAxios";

// Login user
const login = async (userData) => {
  const { data } = await clienteAxios.post("/users/login", userData);

  if (data) localStorage.setItem("token", data.jwt);

  return data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
};
const profile = async () => {
  const { data } = await clienteAxios("/users/profile");
  return data;
};

const authService = {
  logout,
  login,
  profile,
};

export default authService;
