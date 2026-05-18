const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// create chat
router.post("/new", async (req, res) => {
  const { user, title } = req.body;

  const chat = new Chat({
    user,
    title: title || "New Chat",
    messages: []
  });

  await chat.save();
  res.json(chat);
});

// save message
router.post("/message", async (req, res) => {
  const { chatId, role, content } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) return res.status(404).send("Chat not found");

  chat.messages.push({ role, content });
  await chat.save();

  res.json(chat);
});

// get chats
router.get("/:user", async (req, res) => {
  const chats = await Chat.find({ user: req.params.user }).sort({ createdAt: -1 });
  res.json(chats);
});

module.exports = router;