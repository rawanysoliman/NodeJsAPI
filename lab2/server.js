//Creates an Express application

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoutes = require("./routes/users");
const postRoutes = require('./routes/posts');
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json({ received: req.body });
});

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Global Error Middleware
app.use(errorHandler);


// Start server
const Port = process.env.port;
app.listen(Port, () => {
  console.log(`🚀 Server is running on port ${Port}`);
});

// MongoDB connection (hardcoded URI since .env is skipped)
mongoose.connect(process.env.mongo_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;
