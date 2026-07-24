const express = require("express");

const router = express.Router();


// Test authentication route

router.get("/status", (req, res) => {

    res.json({
        message: "Authentication system running"
    });

});


// Future:
// Google OAuth login
// Slack OAuth login


module.exports = router;
