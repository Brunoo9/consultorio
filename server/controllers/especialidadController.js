import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllEspecilidades = async (req, res) => {
  try {
    const especialidades = await prisma.especialidades.findMany();
    return res.status(200).json(
      especialidades.map((especialidad) => {
        return {
          value: especialidad.idespecialidad,
          label: especialidad.nombreespecialidad,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export { getAllEspecilidades };
