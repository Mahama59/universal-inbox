const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());


const messages = [

{
    id:1,
    platform:"Gmail",
    sender:"John",
    message:"Meeting reminder tomorrow",
    status:"Unread"
    starred: false
},
    
    

{
    id:2,
    platform:"Slack",
    sender:"Marketing Team",
    message:"New campaign update",
    status:"Unread"
    starred: false
}

];



app.get("/messages",(req,res)=>{

    res.json(messages);

});



app.listen(3000,()=>{

console.log("Universal Inbox API running");

});
