import express from "express";
import { getAllEspecilidades } from "../controllers/especialidadController.js";
const router = express.Router();
router.get("/getall", getAllEspecilidades);

export default router;
