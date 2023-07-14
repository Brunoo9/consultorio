import express from "express";
import { getAllObras } from "../controllers/obraSocialesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/getall", getAllObras);

export default router;
