const express = require("express");

const router = express.Router();


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


    res.json({

        message:"Login successful",

        user:user

    });


});


// Status

router.get("/status",(req,res)=>{

    res.json({

        status:"Authentication API working"

    });

});


module.exports = router;
