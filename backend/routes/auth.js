import express from "express";
import { register } from "../controllers/authController.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/register", register);

export default router;