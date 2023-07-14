import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createDoctor = async (req, res) => {
  const {
    correo,
    nombresdoctor,
    apellidodoctor,
    idsexo,
    fechanacimiento,
    direccion,
    telefono,
    idespecialidad,
    usuario,
  } = req.body;

  const doctorExists = await prisma.doctores.findUnique({
    where: {
      correo,
    },
  });

  if (doctorExists) {
    return res.status(400).json({ msg: "Ya existe un doctor con ese email!" });
  }
  try {
    await prisma.doctores.create({
      data: {
        nombresdoctor,
        apellidodoctor,
        idsexo,
        fechanacimiento,
        direccion,
        telefono,
        correo,
        idespecialidad,
        usuario,
      },
    });
    return res.status(200).json({ msg: `Doctor creado correctamente` });
  } catch (error) {
    console.log(error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctores.findMany({
      select: {
        iddoctor: true,
        nombresdoctor: true,
        apellidodoctor: true,
        fechanacimiento: true,
        correo: true,
        telefono: true,
        direccion: true,
        usuario: true,
        sexo: true,
        especialidades: true,
      },
      where: {
        eliminado: false,
      },
    });

    return res.status(200).json(
      doctors.map((doctor) => {
        return {
          key: doctor.iddoctor,
          nombresdoctor: doctor.nombresdoctor,
          apellidodoctor: doctor.apellidodoctor,
          fechanacimiento: doctor.fechanacimiento,
          correo: doctor.correo,
          telefono: doctor.telefono,
          direccion: doctor.direccion,
          usuario: doctor.usuario,
          idsexo: doctor.sexo.idsexo,
          sexo: doctor.sexo.sexo,
          idespecialidad: doctor.especialidades.idespecialidad,
          nombreespecialidad: doctor.especialidades.nombreespecialidad,
          eventColor: doctor.eventcolor,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    nombresdoctor,
    apellidodoctor,
    idespecialidad,
    idsexo,
    fechanacimiento,
    correo,
    telefono,
    direccion,
    usuario,
  } = req.body;

  // busco el doctor por el id del cual vamos a editar
  const doctor = await prisma.doctores.findUnique({
    where: {
      iddoctor: Number(id),
    },
  });

  const doctorEmail = await prisma.doctores.findUnique({
    where: {
      correo,
    },
  });

  // si el doctor que voy a editar no tiene el correo igual a otro doctor ya creado entonces lo creo
  if (doctorEmail && doctorEmail?.iddoctor !== doctor.iddoctor) {
    return res.status(404).json({ msg: "Ya existe un doctor con ese correo" });
  }

  if (!doctor) {
    const error = new Error("Doctor no encontrado");
    return res.status(404).json({ msg: `${error.message}` });
  }
  try {
    await prisma.doctores.update({
      where: {
        iddoctor: Number(id),
      },
      data: {
        nombresdoctor: nombresdoctor || doctor.nombresdoctor,
        apellidodoctor: apellidodoctor || doctor.apellidodoctor,
        idsexo: idsexo || doctor.idsexo,
        idespecialidad: idespecialidad || doctor.idespecialidad,
        fechanacimiento: fechanacimiento || doctor.fechanacimiento,
        correo: correo || doctor.correo,
        telefono: telefono || doctor.telefono,
        // codigopostal: req.body.codigopostal || doctor.codigopostal,
        direccion: direccion || doctor.direccion,
        usuario: usuario,
      },
    });
    return res.status(200).json({ msg: "Doctor editado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  const doctor = await prisma.doctores.findUnique({
    where: {
      iddoctor: Number(id),
    },
  });

  if (!doctor || doctor.eliminado) {
    const error = new Error("Paciente no encontrado!");
    return res.status(404).json({ msg: `${error.message}` });
  }

  try {
    console.log(id);
    await prisma.doctores.update({
      where: {
        iddoctor: Number(id),
      },
      data: {
        eliminado: true,
      },
    });

    return res.status(200).json({
      msg: "Doctor eliminado correctamente!",
    });
  } catch (error) {
    console.log(error.message);
  }
  try {
  } catch (error) {
    console.log(error);
  }
};
const getDoctorsSelect = async (req, res) => {
  try {
    const doctors = await prisma.doctores.findMany({
      where: {
        eliminado: false,
      },
    });

    const doctorsRefactor = doctors.map((doctor) => ({
      value: doctor.iddoctor,
      label: `${doctor.nombresdoctor} ${doctor.apellidodoctor}`,
    }));

    return res.status(200).json(doctorsRefactor);
  } catch (error) {
    console.log(error);
  }
};

export {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorsSelect,
};
