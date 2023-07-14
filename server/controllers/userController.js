// dependencias
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

//funciones
import { searchUserByName } from "../helpers/searchUser.js";
import generarId from "../helpers/generarId.js";
import comprobarPassword from "../helpers/comprobarPassword.js";
import generarJWT from "../helpers/generarJWT.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, password, rol } = req.body;
  const userExists = await searchUserByName(name);
  let pwHash;
  if (userExists) {
    // verificamos si existe o no
    const error = new Error("Ya existe el usuario con ese nombre registrado");
    return res.status(400).json({ msg: `${error.message}` });
  }

  if (!password) {
    // sacar lo de repeat pw y validarlo en el front
    const error = new Error("La contraseña es un campo obligatorio");
    return res.status(400).json({ msg: `${error.message}` });
  }

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Error al encriptar la contraseña." });
      } else {
        pwHash = hash;

        const { idusuario } = await prisma.usuarios.create({
          data: {
            nombreusuario: name,
            password: pwHash,
            rol,
            token: generarId(),
            confirm: true,
          },
        }); // creamos el usuario
        res.status(200).json({ idusuario }); // enviamos como respuesta el body de la req
      }
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.json({ msg: "El usuario con ese nombre ya existe" });
    }
    console.log(error);
  }
};

const authUser = async (req, res) => {
  const { name, pw } = req.body;

  // hago la consulta para saber que ese usuario existe
  const user = await prisma.usuarios.findFirst({
    where: {
      nombreusuario: name,
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
  });
  // sino existe error
  if (!user) {
    const error = new Error("Nombre de usuario no existe");
    return res.status(404).json({ msg: `${error.message}` });
  }
  // si existe y esta confirmado
  // if (!user.confirm) {
  //     const error = new Error('Tu cuenta no ha sido confirmada');
  //     return res.status(404).json({msg: `${error.message}`});
  // }

  if (!(await comprobarPassword(pw, user.password))) {
    const error = new Error("La contraseña no coincide");
    return res.status(404).json({ msg: `${error.message}` });
  }

  if (!user.doctores.length <= 0) {
    return res.status(200).json({
      msg: "Usuario logueado correctamente!",
      idusuario: user.idusuario,
      nombreusuario: user.nombreusuario,
      rol: user.roles.nombrerol,
      iddoctor: user.doctores[0].iddoctor,
      jwt: generarJWT(user.idusuario),
    });
  }
  res.status(200).json({
    msg: "Usuario logueado correctamente!",
    idusuario: user.idusuario,
    nombreusuario: user.nombreusuario,
    rol: user.roles.nombrerol,
    jwt: generarJWT(user.idusuario),
  });
  //** mandamos como respuesta tambien al jwt porque lo vamos a mandar despues para consultar las rutas
  //** que necesiten ese jwt(las rutas privadas), para validar el usuario que este iniciando sesión
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuarios.findMany({
      where: {
        eliminado: false,
      },
      include: {
        roles: {
          select: {
            idrol: true,
            nombrerol: true,
          },
        },
        doctores: {
          select: {
            nombresdoctor: true,
          },
        },
      },
    });

    if (!users) {
      const error = new Error("Ningun usuario encontrado");
      return res.status(404).json({ msg: `${error.message}` });
    }

    const usersRefactor = users.map((user) => ({
      key: user.idusuario,
      nombreusuario: user.nombreusuario,
      idrol: user.roles.idrol,
      rol: user.roles.nombrerol,
      confirm: user.confirm,
      token: user.token,
      eliminado: user.eliminado,
      doctores: user.doctores,
    }));
    return res.status(200).json(usersRefactor);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.usuarios.findUnique({
    where: {
      idusuario: Number(id),
    },
  });

  if (!user) {
    const error = new Error("Usuario no encontrado");
    res.status(404).json({ msg: `${error.message}` });
  }

  if (req.body.nombreusuario === user.nombreusuario) {
    const error = new Error("Ya existe ese nombre de usuario registrado");
    res.status(404).json({ msg: `${error.message}` });
  }

  try {
    await prisma.usuarios.update({
      where: {
        idusuario: Number(id),
      },
      data: {
        nombreusuario: req.body.nombreusuario,
        rol: req.body.idrol,
      },
    });

    return res.status(200).json({ msg: "Usuario editado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const userProfile = (req, res) => {
  const { idusuario, nombreusuario, roles, doctores } = req.usuario;
  if (!doctores.length <= 0) {
    return res.status(200).json({
      idusuario,
      nombreusuario,
      rol: roles.nombrerol,
      iddoctor: doctores[0].iddoctor,
    });
  }
  res.status(200).json({
    idusuario,
    nombreusuario,
    rol: roles.nombrerol,
  });
};

const getUsersSelect = async (req, res) => {
  try {
    const users = await prisma.usuarios.findMany();

    const usersRefactor = users.map((user) => ({
      value: user.idusuario,
      label: user.nombreusuario,
    }));
    return res.status(200).json(usersRefactor);
  } catch (error) {
    console.log(error);
  }
};

const getAllRols = async (req, res) => {
  try {
    const rols = await prisma.roles.findMany();

    return res.status(200).json(
      rols.map((rol) => {
        return {
          value: rol.idrol,
          label: rol.nombrerol,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  createUser,
  authUser,
  getAllUsers,
  updateUser,
  userProfile,
  getAllRols,
  getUsersSelect,
};
