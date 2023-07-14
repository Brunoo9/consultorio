import axios from "axios";

const defaultOptions = {
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
};

//Crea instancia
let clienteAxios = axios.create(defaultOptions);
const token = localStorage.getItem("token");
//Setea el token para todas las request - usando interceptos.
if (token) {
  clienteAxios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export default clienteAxios;
