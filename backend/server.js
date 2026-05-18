require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/scholarai";
console.log("Connecting to MongoDB at", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected 💚"))
  .catch(err => console.error("MongoDB connection error:", err.message || err));

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err.message || err);
});

// routes
app.use("/api/chat", require("./routes/chat"));          // AI route (existing)
app.use("/api/chats", require("./routes/chatHistory"));  // Chat history (MongoDB)

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});