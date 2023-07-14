import express from "express";
import {
  createPatient,
  getAllPatients,
  getOnePatient,
  updatePatient,
  deletePatient,
  countPatients,
  getPatientsSelect,
  getAllPatientsByDoctor,
} from "../controllers/patientController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/create", checkAuth, createPatient);
router.get("/getall", checkAuth, getAllPatients);
router.get("/getall/:id", getAllPatientsByDoctor);
router.get("/get-selects", checkAuth, getPatientsSelect);
router.get("/getone/:id", getOnePatient);
router.put("/update/:id", updatePatient);
router.delete("/delete/:id", deletePatient);
router.get("/count", countPatients);

export default router;
