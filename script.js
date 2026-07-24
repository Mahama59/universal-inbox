// Universal Inbox v0.3
const API =
"http://localhost:3000/messages";
console.log("Universal Inbox running");


let inboxData = [];


const inbox = document.getElementById("inbox");



fetch("https://universal-inbox-api.onrender.com/messages")

.then(response => response.json())

.then(data => {


    inboxData = data;


    displayMessages();


});


function displayMessages(){


    inbox.innerHTML = "";


    inboxData.forEach(function(item,index){


        const messageCard =
        document.createElement("div");


        messageCard.className = "message";


        messageCard.innerHTML = `

        <h3>${item.platform}</h3>

        <p>
        <b>${item.sender}:</b>
        ${item.message}
        </p>


        <small class="status">
        ${item.status}
        </small>


        <br><br>


        <button onclick="markRead(${index})">
        Mark Read
        </button>


        <button onclick="markUnread(${index})">
        Mark Unread
        </button>

        `;


        inbox.appendChild(messageCard);


    });

}



function markRead(index){

    inboxData[index].status="Read";

    displayMessages();

}



function markUnread(index){

    inboxData[index].status="Unread";

    displayMessages();

}

const inbox = document.getElementById("inbox");


inboxData.forEach(function(item, index){

    const messageCard = document.createElement("div");

    messageCard.className = "message";


    messageCard.innerHTML = `

        <h3>${item.platform}</h3>

        <p><b>${item.sender}:</b> ${item.message}</p>

        <small class="status">
        ${item.time} - ${item.status}
        </small>

        <br><br>

        <button class="read-btn">
        Mark as Read
        </button>

        <button class="unread-btn">
        Mark as Unread
        </button>

    `;


    inbox.appendChild(messageCard);

});



const readButtons = document.querySelectorAll(".read-btn");
const unreadButtons = document.querySelectorAll(".unread-btn");



readButtons.forEach(function(button,index){

    button.onclick = function(){

        inboxData[index].status = "Read";

        document.querySelectorAll(".status")[index].textContent =
        inboxData[index].time + " - " + inboxData[index].status;

    };

});



unreadButtons.forEach(function(button,index){

    button.onclick = function(){

        inboxData[index].status = "Unread";

        document.querySelectorAll(".status")[index].textContent =
        inboxData[index].time + " - " + inboxData[index].status;

    };

});

function updateNotification(){

    const unreadMessages = inboxData.filter(function(item){

        return item.status === "Unread";

    });


    document.getElementById("notification").textContent =
    "🔔 " + unreadMessages.length;

}


updateNotification();


// USER SYSTEM


function register(){

    let username =
    document.getElementById("username").value;


    let password =
    document.getElementById("password").value;


    localStorage.setItem(
        "user",
        JSON.stringify({
            username: username,
            password: password
        })
    );


    alert("Account created!");

}



function login(){

    let username =
    document.getElementById("username").value;


    let password =
    document.getElementById("password").value;


    let savedUser =
    JSON.parse(localStorage.getItem("user"));


    if(savedUser &&
       savedUser.username === username &&
       savedUser.password === password){

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert("Login successful!");

        window.location.href="index.html";

    }

    else{

        alert("Wrong login details");

    }

}
