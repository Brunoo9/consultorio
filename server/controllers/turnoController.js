import { PrismaClient } from "@prisma/client";
import { group } from "console";

const prisma = new PrismaClient();

const createTurno = async (req, res) => {
  const { observaciones, doctor, turnStart, turnEnd, paciente, idtipoturno } =
    req.body;

  try {
    const turno = await prisma.turnos.findFirst({
      where: {
        turnStart,
      },
    });
    if (turno?.paciente === paciente) {
      return res
        .status(400)
        .json({ msg: "El paciente ya tiene un turno en ese horario" });
    }
    if (turno && turno.doctor === doctor) {
      return res
        .status(400)
        .json({ msg: "El doctor ya tiene un turno en ese horario" });
    }

    await prisma.turnos.create({
      data: {
        observaciones,
        doctor,
        paciente,
        turnStart,
        turnEnd,
        idtipoturno,
      },
    });

    return res.status(200).json({ msg: "Turno agendado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const getAllTurnos = async (req, res) => {
  try {
    const turnos = await prisma.turnos.findMany();

    if (!turnos) {
      const error = new Error("Ningun turno encontrado");
      return res.status(404).json({ msg: `${error.message}` });
    }

    res.json(turnos);
  } catch (error) {
    console.log(error);
  }
};
const getAllEvents = async (req, res) => {
  console.log("sape");
  try {
    const turnos = await prisma.turnos.findMany({
      select: {
        idturno: true,
        observaciones: true,
        doctor: true,
        turnStart: true,
        turnEnd: true,
        paciente: true,
        tipoturno: {
          select: {
            idtipoturno: true,
            tituloturno: true,
          },
        },
        doctores: {
          select: {
            nombresdoctor: true,
            apellidodoctor: true,
            especialidades: {
              select: {
                nombreespecialidad: true,
              },
            },
          },
        },
        pacientes: {
          select: {
            idpaciente: true,
            nombrespaciente: true,
            apellidopaciente: true,
          },
        },
      },
    });

    if (!turnos) {
      const error = new Error("Ningun turno encontrado");
      return res.status(404).json({ msg: `${error.message}` });
    }

    return res.status(200).json(
      turnos.map((turno) => ({
        id: turno.idturno,
        idturno: turno.idturno,
        observaciones: turno.observaciones,
        idtipoturno: turno.tipoturno.idtipoturno,
        tituloturno: turno.tipoturno.tituloturno,
        idpaciente: turno.pacientes.idpaciente,
        turnStart: turno.turnStart,
        turnEnd: turno.turnEnd,
        nombrepaciente: `${turno.pacientes.nombrespaciente} ${turno.pacientes.apellidopaciente}`,
        nombredoctor: `${turno.doctores.nombresdoctor} ${turno.doctores.apellidodoctor}`,
        especialidad: turno.doctores.especialidades.nombreespecialidad,
        resourceId: turno.doctor,
        title: turno.tipoturno.tituloturno,
        start: turno.turnStart,
        end: turno.turnEnd,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};
const getAllEventsByDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const turnos = await prisma.turnos.findMany({
      select: {
        idturno: true,
        observaciones: true,
        doctor: true,
        turnStart: true,
        turnEnd: true,
        paciente: true,
        tipoturno: {
          select: {
            idtipoturno: true,
            tituloturno: true,
          },
        },
        doctores: {
          select: {
            nombresdoctor: true,
            apellidodoctor: true,
            especialidades: {
              select: {
                nombreespecialidad: true,
              },
            },
          },
        },
        pacientes: {
          select: {
            idpaciente: true,
            nombrespaciente: true,
            apellidopaciente: true,
          },
        },
      },
      where: {
        doctor: Number(id),
      },
    });

    if (!turnos) {
      const error = new Error("Ningun turno encontrado");
      return res.status(404).json({ msg: `${error.message}` });
    }

    return res.status(200).json(
      turnos.map((turno) => ({
        id: turno.idturno,
        idturno: turno.idturno,
        observaciones: turno.observaciones,
        idtipoturno: turno.tipoturno.idtipoturno,
        tituloturno: turno.tipoturno.tituloturno,
        idpaciente: turno.pacientes.idpaciente,
        turnStart: turno.turnStart,
        turnEnd: turno.turnEnd,
        nombrepaciente: `${turno.pacientes.nombrespaciente} ${turno.pacientes.apellidopaciente}`,
        nombredoctor: `${turno.doctores.nombresdoctor} ${turno.doctores.apellidodoctor}`,
        especialidad: turno.doctores.especialidades.nombreespecialidad,
        resourceId: turno.doctor,
        title: turno.tipoturno.tituloturno,
        start: turno.turnStart,
        end: turno.turnEnd,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

const updateTurnos = async (req, res) => {};

const deleteTurno = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.turnos.delete({
      where: {
        idturno: Number(id),
      },
    });

    return res.status(200).json({ msg: "Turno eliminado correctamente!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "No se pudo eliminar el turno" });
  }
};

const getAllTipoTurno = async (req, res) => {
  try {
    const tipoTurnos = await prisma.tipoturno.findMany();

    return res.status(200).json(
      tipoTurnos.map((tipo) => {
        return {
          value: tipo.idtipoturno,
          label: tipo.tituloturno,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const countTurnoByDoctor = async (req, res) => {
  try {
    const turnos = await prisma.doctores.findMany({
      where: {
        eliminado: false,
      },
      select: {
        iddoctor: true,
        nombresdoctor: true,
        apellidodoctor: true,
        _count: {
          select: {
            turnos: true,
          },
        },
      },
    });

    return res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
  }
};
const countTurnos = async (req, res) => {
  try {
    const turnosCount = await prisma.turnos.count();

    return res.status(200).json({
      count: turnosCount,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createTurno,
  getAllTurnos,
  getAllEventsByDoctor,
  updateTurnos,
  deleteTurno,
  getAllEvents,
  getAllTipoTurno,
  countTurnoByDoctor,
  countTurnos,
};
