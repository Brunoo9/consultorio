import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTypeBlood = async (req, res) => {
  try {
    const types = await prisma.tipos_de_sangre.findMany();

    return res.status(200).json(
      types.map((type) => {
        return {
          value: type.idtipodesangre,
          label: type.tipodesangre,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export { getAllTypeBlood };
