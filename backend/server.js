const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");


const app = express();


app.use(cors());
app.use(express.json());


// Routes

app.use("/auth", authRoutes);

app.use("/messages", messageRoutes);



app.listen(3000,()=>{

    console.log("Universal Inbox API running");

});
