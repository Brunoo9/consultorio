import { PrismaClient } from "@prisma/client";
import { patients } from "./data/patients.js";
import { tiposangre } from "./data/tiposangre.js";
import { localidades } from "./data/localidades.js";
import { provincias } from "./data/provincias.js";
import { generos } from "./data/generos.js";
import { obrassociales } from "./data/obrassociales.js";
import { roles } from "./data/roles.js";
import { usuarios } from "./data/users.js";
import { doctores } from "./data/doctores.js";
import { especialidades } from "./data/especialidades.js";
import { tipoturno } from "./data/tipoturno.js";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.tipoturno.createMany({ data: tipoturno });
    await prisma.roles.createMany({ data: roles });
    await prisma.usuarios.createMany({ data: usuarios });
    await prisma.obras_sociales.createMany({ data: obrassociales });
    await prisma.provincias.createMany({ data: provincias });
    await prisma.localidades.createMany({ data: localidades });
    await prisma.sexo.createMany({ data: generos });
    await prisma.especialidades.createMany({ data: especialidades });
    await prisma.doctores.createMany({ data: doctores });
    await prisma.tipos_de_sangre.createMany({ data: tiposangre });
    await prisma.pacientes.createMany({ data: patients });
  } catch (error) {
    console.log(error);
  }
}

main();
