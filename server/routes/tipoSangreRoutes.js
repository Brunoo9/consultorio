import express from "express";
import { getAllTypeBlood } from "../controllers/tipoSangreController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/getall", getAllTypeBlood);

export default router;
