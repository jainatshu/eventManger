import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure authMiddleware is used

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe); // ✅ New route

export default router;
