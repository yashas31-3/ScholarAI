const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", require("./routes/chat"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});