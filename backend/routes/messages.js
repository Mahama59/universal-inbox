const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const { messages } = require("../database/db");

// Get all messages for logged-in user
router.get("/", authenticate, (req, res) => {

    const userId = req.user.id;

    const userMessages = messages.filter(message => {
        return message.userId === userId;
    });

    res.json(userMessages);

});


// Create new message
router.post("/", authenticate, (req, res) => {

    const newMessage = {
        id: messages.length + 1,
        userId: req.user.id,
        platform: req.body.platform,
        sender: req.body.sender,
        message: req.body.message,
        time: req.body.time,
        status: req.body.status || "Unread",
        starred: req.body.starred || false
    };

    messages.push(newMessage);

    res.status(201).json(newMessage);

});


// Update message
router.put("/:id", authenticate, (req, res) => {

    const id = parseInt(req.params.id);

    const message = messages.find(m =>
        m.id === id && m.userId === req.user.id
    );

    if (!message) {
        return res.status(404).json({
            error: "Message not found"
        });
    }

    Object.assign(message, req.body);

    res.json(message);

});


// Delete message
router.delete("/:id", authenticate, (req, res) => {

    const id = parseInt(req.params.id);

    const index = messages.findIndex(m =>
        m.id === id && m.userId === req.user.id
    );

    if (index === -1) {
        return res.status(404).json({
            error: "Message not found"
        });
    }

    messages.splice(index, 1);

    res.json({
        message: "Message deleted"
    });

});

module.exports = router;
