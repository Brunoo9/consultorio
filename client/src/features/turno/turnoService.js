import clienteAxios from "../../config/clienteAxios";

const getEventsByDoctor = async (id) => {
  const { data } = await clienteAxios(`/turnos/getevents/${id}`);

  return data;
};

const turnoService = {
  getEventsByDoctor,
};

export default turnoService;
