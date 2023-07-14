import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllSex = async (req, res) => {
  try {
    const sexos = await prisma.sexo.findMany();

    return res.status(200).json(
      sexos.map((sexo) => {
        return {
          value: sexo.idsexo,
          label: sexo.sexo,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export { getAllSex };
