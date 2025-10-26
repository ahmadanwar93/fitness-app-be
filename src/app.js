const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Fitness Center API",
    version: "1.0.0",
    status: "running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

module.exports = app;
