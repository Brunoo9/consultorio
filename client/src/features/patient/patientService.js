import clienteAxios from "../../config/clienteAxios";

const token = localStorage.getItem("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
// get all patients
const getPatients = async () => {
  const { data } = await clienteAxios("/patients/getall", config);
  return data;
};
const getPatientsByDoctor = async (id) => {
  const { data } = await clienteAxios(`/patients/getall/${id}`, config);
  return data;
};
const deletePatient = async (id) => {
  const { data } = await clienteAxios.delete(`/patients/delete/${id}`);
  return data;
};
const updatePatient = async (id, values) => {
  const { data } = await clienteAxios.put(`/patients/update/${id}`, values);
  return data;
};
const createPatient = async (values) => {
  const { data } = await clienteAxios.post(`/patients/create`, values);
  return data;
};

const patientService = {
  getPatients,
  getPatientsByDoctor,
  deletePatient,
  updatePatient,
  createPatient,
};

export default patientService;
