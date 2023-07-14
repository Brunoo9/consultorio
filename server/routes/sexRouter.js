import express from "express";
import { getAllSex } from "../controllers/sexController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/getall", getAllSex);

export default router;
