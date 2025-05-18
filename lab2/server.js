//Creates an Express application

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/users");
const postRoutes = require('./routes/posts');
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Global Error Middleware
app.use(errorHandler);

// MongoDB connection (hardcoded URI since .env is skipped)
mongoose.connect("mongodb://127.0.0.1:27017/lab3NodeDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

module.exports = app;
