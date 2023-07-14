import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // saco la palabra bearer del string para que quede solo el token
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifico que el token no sea falso o no este vencido
      req.usuario = await prisma.usuarios.findUnique({
        where: {
          idusuario: Number(decoded.id),
        },
        include: {
          roles: {
            select: {
              nombrerol: true,
            },
          },
          doctores: {
            select: {
              iddoctor: true,
            },
          },
        },
      }); // consulto para ver si esta el usuario, para guardar un inicio de sesion de un usuario
      // si todo sale bien, creo el req.usuario para poder despues tener un perfil del que inicia sesion
      // y poder validarlo
      return next();
    } catch (error) {
      return res.status(404).json({ msg: `${error}` });
    }
  }
  if (!token) {
    return res.status(401).json({ msg: "Ningun token" });
  }
};

export default checkAuth;
