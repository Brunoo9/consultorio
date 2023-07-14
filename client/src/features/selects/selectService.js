import clienteAxios from "../../config/clienteAxios";

const getRols = async () => {
  const { data } = await clienteAxios(`/users/getrol`);
  return data;
};
const getGenders = async () => {
  const { data } = await clienteAxios(`/sexos/getall`);

  return data;
};
const getEspecialities = async () => {
  const { data } = await clienteAxios(`/especialidad/getall`);
  return data;
};

const getBloodType = async () => {
  const { data } = await clienteAxios(`/blood/getall`);
  return data;
};
const getObraSocial = async () => {
  const { data } = await clienteAxios(`/obras/getall`);
  return data;
};
const getPatientsSelect = async () => {
  const { data } = await clienteAxios(`/patients/get-selects`);
  return data;
};
const getDoctorsSelect = async () => {
  const { data } = await clienteAxios(`/doctors/get-selects`);
  return data;
};
const getTipoTurno = async () => {
  const { data } = await clienteAxios("turnos/gettipo");
  return data;
};
const getUserSelects = async () => {
  const { data } = await clienteAxios("users/get-selects");
  return data;
};
const getEvents = async () => {
  const { data } = await clienteAxios("/turnos/getevents");
  return data;
};

const selectService = {
  getRols,
  getGenders,
  getEspecialities,
  getBloodType,
  getObraSocial,
  getPatientsSelect,
  getDoctorsSelect,
  getTipoTurno,
  getUserSelects,
  getEvents,
};

export default selectService;
