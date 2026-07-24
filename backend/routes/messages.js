const express = require("express");
const router = express.Router();

const { messages } = require("../database/db");

// Get all messages
router.get("/", (req, res) => {

    const userId = parseInt(req.query.userId);


    const userMessages = messages.filter(message => {

        return message.userId === userId;

    });


    res.json(userMessages);

});

router.post("/", (req, res) => {

    const newMessage = {
        id: messages.length + 1,
        ...req.body
    };

    messages.push(newMessage);

    res.status(201).json(newMessage);

});

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const message = messages.find(m => m.id === id);

    if (!message) {
        return res.status(404).json({
            error: "Message not found"
        });
    }

    Object.assign(message, req.body);

    res.json(message);

});

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = messages.findIndex(m => m.id === id);

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
