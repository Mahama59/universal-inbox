const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET = "your-secret-key";

const users = [];


// Register

router.post("/register", (req,res)=>{

    const user = {

        id: users.length + 1,

        username: req.body.username,

        password: req.body.password

    };


    users.push(user);


    res.status(201).json({

        message:"Account created",

        user:user

    });

});


// Login

router.post("/login",(req,res)=>{


    const user = users.find(user =>

        user.username === req.body.username &&

        user.password === req.body.password

    );


    if(!user){

        return res.status(401).json({

            message:"Invalid login details"

        });

    }


    const token = jwt.sign(

    {
        id: user.id,
        username: user.username
    },

    JWT_SECRET,

    {
        expiresIn: "24h"
    }

);


res.json({

    message: "Login successful",

    token: token,

    user: user

});

});

// Status

router.get("/status",(req,res)=>{

    res.json({

        status:"Authentication API working"

    });

});


module.exports = router;
