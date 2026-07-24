const express = require("express");

const router = express.Router();


const gmail =
require("../services/gmail");


const slack =
require("../services/slack");



// Get all messages

router.get("/", (req,res)=>{


    const messages = [

        ...gmail.getGmailMessages(),

        ...slack.getSlackMessages()

    ];


    res.json(messages);


});

router.post("/", (req, res) => {

    const newMessage = {
        id: messages.length + 1,
        ...req.body
    };

    messages.push(newMessage);

    res.status(201).json(newMessage);

});

module.exports = router;
