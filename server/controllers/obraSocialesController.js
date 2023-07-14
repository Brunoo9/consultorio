import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllObras = async (req, res) => {
  try {
    const obras = await prisma.obras_sociales.findMany();

    return res.status(200).json(
      obras.map((obra) => {
        return {
          value: obra.idobrasocial,
          label: obra.nombreobrasocial,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export { getAllObras };
