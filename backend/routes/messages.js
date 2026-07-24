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



module.exports = router;
