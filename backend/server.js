require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const requirementRoutes = require("./routes/requirements");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/requirements", requirementRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Event Hire API running" });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/event-hire";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
