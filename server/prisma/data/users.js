import pwEncrypt from "../../helpers/pwEncrypt.js";
import generarId from "../../helpers/generarId.js";

const usuarios = [
  {
    idusuario: 1,
    nombreusuario: "secretaria",
    password: await pwEncrypt("asd123"),
    rol: 2,
    confirm: false,
    token: generarId(),
    eliminado: false,
  },
  {
    idusuario: 2,
    nombreusuario: "admin",
    password: await pwEncrypt("adminpw"),
    rol: 1,
    confirm: false,
    token: generarId(),
    eliminado: false,
  },
  {
    idusuario: 3,
    nombreusuario: "doctor",
    password: await pwEncrypt("asd123"),
    rol: 3,
    confirm: false,
    token: generarId(),
    eliminado: false,
  },
  {
    idusuario: 4,
    nombreusuario: "doctor2",
    password: await pwEncrypt("asd123"),
    rol: 3,
    confirm: false,
    token: generarId(),
    eliminado: false,
  },
];

export { usuarios };
