import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Change to deployed URL in production
    credentials: true,
  },
});

// Connect Database
connectDB();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Socket.io Real-Time Updates
io.on("connection", (socket) => {
  console.log("🔵 A user connected:", socket.id);

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
    console.log(`User joined event: ${eventId}`);
  });

  socket.on("leaveEvent", (eventId) => {
    socket.leave(eventId);
    console.log(`User left event: ${eventId}`);
  });

  socket.on("newAttendee", (eventId, attendee) => {
    io.to(eventId).emit("attendeeUpdate", attendee);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
