import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPatient = async (req, res) => {
  // aca me guardo lo que viene en la url, que en este caso
  // es la info del paciente a crear(nombre, appellido, etc)
  const {
    nrodocumento,
    nombres,
    apellidos,
    idsexo,
    fechaNac,
    correo,
    telefono,
    telefonoresponsable,
    direccion,
    obrasocial,
  } = req.body; // aca lo que viene

  const patient = await prisma.pacientes.findUnique({
    where: {
      nrodocumento,
    },
  });

  if (patient) {
    return res.status(400).json({
      msg: "Ya existe un paciente con ese documento",
    });
  }
  try {
    // aca hago la consulta a la bd
    await prisma.pacientes.create({
      data: {
        nrodocumento: nrodocumento,
        nombrespaciente: nombres,
        apellidopaciente: apellidos,
        idsexo: idsexo,
        fechanacimiento: fechaNac,
        correo: correo,
        telefono: telefono,
        telefonoresponsable: telefonoresponsable,
        direccion: direccion,
        provincia: 1,
        localidad: 1,
        obrasocial: obrasocial,
        eliminado: false,
      },
    });

    return res.status(200).json({
      msg: `Paciente creado correctamente`,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.pacientes.findMany({
      include: {
        provincias: {
          select: {
            nombreprovincia: true,
          },
        },
        localidades: {
          select: {
            nombrelocalidad: true,
          },
        },
        // tipos_documentos: {
        //   select: {
        //     tipo: true,
        //   },
        // },
        sexo: {
          select: {
            sexo: true,
          },
        },
        obras_sociales: {
          select: {
            nombreobrasocial: true,
            numobrasocial: true,
          },
        },
      },
      where: {
        eliminado: false,
      },
    });

    res.json(
      patients.map((patient) => {
        return {
          key: patient.idpaciente,
          nombres: patient.nombrespaciente,
          apellidos: patient.apellidopaciente,
          fechaNac: patient.fechanacimiento,
          // idtipodocumento: patient.tipodocumento,
          // tipodocumento: patient.tipos_documentos.tipo,
          nrodocumento: patient.nrodocumento,
          idsexo: patient.idsexo,
          sexo: patient.sexo.sexo,
          telefono: patient.telefono,
          telefonoresponsable: patient.telefonoresponsable,
          correo: patient.correo,
          idobrasocial: patient.obrasocial,
          obrasocial: patient.obras_sociales.nombreobrasocial,
          numobrasocial: patient.obras_sociales.numobrasocial,
          direccion: patient.direccion,
          idprovincia: patient.provincia,
          provincia: patient.provincias.nombreprovincia,
          idlocalidad: patient.localidad,
          localidad: patient.localidades.nombrelocalidad,
          // codigopostal: patient.codigopostal,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};
const getAllPatientsByDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const patients = await prisma.pacientes.findMany({
      include: {
        provincias: {
          select: {
            nombreprovincia: true,
          },
        },
        localidades: {
          select: {
            nombrelocalidad: true,
          },
        },

        sexo: {
          select: {
            sexo: true,
          },
        },
        obras_sociales: {
          select: {
            nombreobrasocial: true,
            numobrasocial: true,
          },
        },
      },
      where: {
        iddoctor: Number(id),
        eliminado: false,
      },
    });

    res.json(
      patients.map((patient) => {
        return {
          key: patient.idpaciente,
          nombres: patient.nombrespaciente,
          apellidos: patient.apellidopaciente,
          fechaNac: patient.fechanacimiento,
          nrodocumento: patient.nrodocumento,
          idsexo: patient.idsexo,
          sexo: patient.sexo.sexo,
          telefono: patient.telefono,
          telefonoresponsable: patient.telefonoresponsable,
          correo: patient.correo,
          idobrasocial: patient.obrasocial,
          obrasocial: patient.obras_sociales.nombreobrasocial,
          numobrasocial: patient.obras_sociales.numobrasocial,
          direccion: patient.direccion,
          idprovincia: patient.provincia,
          provincia: patient.provincias.nombreprovincia,
          idlocalidad: patient.localidad,
          localidad: patient.localidades.nombrelocalidad,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const getOnePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await prisma.pacientes.findUnique({
      where: {
        idpaciente: Number(id),
      },
    });

    if (!patient) {
      const error = new Error(`No existe un paciente con el ID:${id}`); // creo una instancia de erro con ese mensaje
      return res.status(404).json({ msg: `${error.message}` }); // retorno la respuesta con el estatus 404 y el mensaje
    }

    // si encontro paciente
    return res.status(200).json(patient); // mando los datos del paciente como respuesta
  } catch (error) {
    res.status(404).json({ msg: `${error.message}` }); // sino encuentra o ocurre algun error
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await prisma.pacientes.findUnique({
    where: {
      idpaciente: Number(id),
    },
  });

  if (!patient) {
    const error = new Error("Paciente no encontrado");
    res.status(404).json({ msg: `${error.message}` });
  }

  // por si edita el documento y es igual a un paciente ya registrado
  if (req.body.nrodocumento !== patient.nrodocumento) {
    const pacientNew = await prisma.pacientes.findUnique({
      where: {
        nrodocumento: req.body.nrodocumento,
      },
    });
    if (pacientNew) {
      const error = new Error("Ya existe un paciente con ese documento");
      res.status(404).json({ msg: `${error.message}` });
    }
  }

  try {
    await prisma.pacientes.update({
      where: {
        idpaciente: Number(id),
      },
      data: {
        nrodocumento: req.body.nrodocumento || patient.nrodocumento,
        // tipodocumento: req.body.tipodocumento || patient.tipodocumento,
        nombrespaciente: req.body.nombres || patient.nombrespaciente,
        apellidopaciente: req.body.apellidos || patient.apellidopaciente,
        idsexo: req.body.idsexo || patient.idsexo,
        fechanacimiento: req.body.fechaNac || patient.fechanacimiento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        telefonoresponsable: req.body.telefonoresponsable,
        // codigopostal: req.body.codigopostal,
        direccion: req.body.direccion,
        provincia: req.body.provincia || patient.provincia,
        localidad: req.body.localidad || patient.localidad,
        obrasocial: req.body.obrasocial || patient.obrasocial,
      },
    });
    return res.status(200).json({ msg: "Paciente editado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await prisma.pacientes.findUnique({
    where: {
      idpaciente: Number(id),
    },
  });

  if (!patient || patient.eliminado) {
    const error = new Error("Paciente no encontrado!");
    res.status(404).json({ msg: `${error.message}` });
  }

  try {
    const patientDeleted = await prisma.pacientes.update({
      where: {
        idpaciente: Number(id),
      },
      data: {
        eliminado: true,
      },
    });

    return res.status(200).json({
      msg: "Paciente eliminado correctamente!",
      idpaciente: patientDeleted.idpaciente,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const countPatients = async (req, res) => {
  try {
    const patientCount = await prisma.pacientes.count({
      where: {
        eliminado: false,
      },
    });

    return res.status(200).json({
      count: patientCount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getPatientsSelect = async (req, res) => {
  try {
    const patients = await prisma.pacientes.findMany();

    const patientsRefactor = patients.map((patient) => ({
      value: patient.idpaciente,
      label: `${patient.nombrespaciente} - ${Number(
        patient.nrodocumento
      ).toLocaleString("es")}`,
    }));

    return res.status(200).json(patientsRefactor);
  } catch (error) {
    console.log(error);
  }
};

export {
  createPatient,
  getAllPatients,
  getOnePatient,
  updatePatient,
  deletePatient,
  countPatients,
  getPatientsSelect,
  getAllPatientsByDoctor,
};
