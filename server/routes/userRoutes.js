import express from "express";

import {
  createUser,
  authUser,
  getAllUsers,
  updateUser,
  userProfile,
  getAllRols,
  getUsersSelect,
} from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

// rutas publicas
router.post("/create", createUser);
router.post("/login", authUser);
router.get("/getall", getAllUsers);
router.put("/update/:id", updateUser);
router.get("/getrol", getAllRols);
router.get("/get-selects", getUsersSelect);

// rutas privadas

router.get("/profile", checkAuth, userProfile);

export default router;
