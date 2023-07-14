import express from "express";
import {
  createTurno,
  getAllTurnos,
  getAllEvents,
  getAllTipoTurno,
  deleteTurno,
  countTurnoByDoctor,
  countTurnos,
  getAllEventsByDoctor,
} from "../controllers/turnoController.js";
const router = express.Router();

router.post("/create", createTurno);
router.get("/getall", getAllTurnos);
router.get("/getevents", getAllEvents);
router.get("/getevents/:id", getAllEventsByDoctor);
router.get("/gettipo", getAllTipoTurno);
router.delete("/delete/:id", deleteTurno);
router.get("/getturnobydoctor", countTurnoByDoctor);
router.get("/count", countTurnos);

export default router;
