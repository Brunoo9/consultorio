// librerias
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//importacion de archivo de  rutas
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import turnoRoutes from "./routes/turnoRoutes.js";
import obraRoutes from "./routes/obraRoutes.js";
import sexRoutes from "./routes/sexRouter.js";
import bloodRoutes from "./routes/tipoSangreRoutes.js";
import especialidadRoutes from "./routes/especialidadRoutes.js";
const app = express(); // me paso todas las funcionalidades de express a app

app.use(express.json()); // para que pueda leer las respuestas como json

dotenv.config(); // para establecer la configuracion de las variables de entorno

//CONFIGURACIÓN DE CORS
const whiteList = [
  process.env.FRONTEND_URL_A,
  process.env.FRONTEND_URL_B,
  process.env.FRONTEND_URL_C,
];

const corsOptions = {
  origin: function (origin, callback) {
    // el origin trae quien realiza la peticion ej: localhost:3000
    console.log(`ip: ${origin}`);
    if (whiteList.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("error de cors"));
    }
  },
};

app.use(cors(corsOptions));

//RUTAS
app.use("/api/patients", patientRoutes); // aca le digo que para esa ruta ejecute ese archivo
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/turnos", turnoRoutes);
app.use("/api/obras", obraRoutes);
app.use("/api/sexos", sexRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/especialidad", especialidadRoutes);

const port = process.env.PORT || 4000; // aca le asigno el puerto a la variable port

app.listen(port, () => {
  // aca lo pongo en escucha al servidor
  console.log(`Servidor corriendo en el puerto ${port}`);
});
