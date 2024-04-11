import { Router } from "express";
import { signup, login, getUsers } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUsers", getUsers);

export default router;
