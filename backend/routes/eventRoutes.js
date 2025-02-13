import express from "express";
import { createEvent, getEvents, registerAttendee, getEventDetails } from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventDetails);
router.post("/register", authMiddleware, registerAttendee);

export default router;
