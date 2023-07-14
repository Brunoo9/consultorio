import clienteAxios from "../../config/clienteAxios";

const getDoctors = async () => {
  const { data } = await clienteAxios("/doctors/getall");
  return data;
};
const deleteDoctor = async (id) => {
  const { data } = await clienteAxios.delete(`/doctors/delete/${id}`);
  return data;
};
const updateDoctor = async (id, values) => {
  const { data } = await clienteAxios.put(`/doctors/update/${id}`, values);
  return data;
};
const createDoctor = async (values) => {
  const { data } = await clienteAxios.post(`/doctors/create`, values);
  return data;
};

const doctorService = {
  getDoctors,
  deleteDoctor,
  updateDoctor,
  createDoctor,
};

export default doctorService;
