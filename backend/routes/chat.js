const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;

  console.log("Message received:", message);

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: message,
      stream: false
    });

    console.log("FULL RESPONSE:", response.data);

    let reply = response.data.response || "No response from AI";

    // Clean formatting
    reply = reply.replace(/\\n/g, '\n').replace(/\+/g, '');

    res.json({ reply });

  } catch (err) {
    console.error("ERROR:", err.message);

    res.json({
      reply: "AI failed 😭"
    });
  }
});

module.exports = router;
