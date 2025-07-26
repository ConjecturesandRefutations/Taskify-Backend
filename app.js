// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const cors = require("cors");
const hbs = require("hbs");

const app = express();

// ✅ Apply CORS immediately
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ❗️ Parse JSON and URL-encoded data before routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ℹ️ Remaining middleware (sessions, static files, logger, etc.)
require("./config")(app);

// 📦 Task API routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// 👇 View routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// 🧪 Test route
app.get("/api/test", (req, res) => {
  console.log("Test route hit!");
  res.json({ message: "test successful" });
});

// ❗️ Error handling middleware
require("./error-handling")(app);

module.exports = app;
