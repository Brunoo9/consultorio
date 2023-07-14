import express from "express";
import {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorsSelect,
} from "../controllers/doctorController.js";

const router = express.Router();
router.post("/create", createDoctor);
router.get("/getall", getAllDoctors);
router.get("/get-selects", getDoctorsSelect);
router.put("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor);

export default router;
