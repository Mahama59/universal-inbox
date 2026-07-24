function saveMessage(){


    const sender =
    document.getElementById("sender").value;


    const platform =
    document.getElementById("platform").value;


    const message =
    document.getElementById("message").value;



    if(!sender || !platform || !message){

        alert("Please complete all fields");

        return;

    }



    let inboxData =
    JSON.parse(localStorage.getItem("inboxData")) || [];



    const newMessage = {

        id: Date.now(),

        platform: platform,

        sender: sender,

        message: message,

        time: new Date()
        .toLocaleTimeString(),

        status:"Unread",

        starred:false

    };



    inboxData.unshift(newMessage);



    localStorage.setItem(
        "inboxData",
        JSON.stringify(inboxData)
    );



    alert("Message created successfully!");



    window.location.href="index.html";


}
