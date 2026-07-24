function checkSession(){

    const loggedIn =
    localStorage.getItem("loggedIn");


    if(!loggedIn){

        window.location.href="login.html";

    }

}

// Universal Inbox v1.0


console.log("Universal Inbox running");


// Load messages from storage first
// Load messages from backend API

let inboxData = [];


const currentUser =
JSON.parse(localStorage.getItem("user"));


fetch(
"http://localhost:3000/messages?userId=" + currentUser.id
)

.then(response => response.json())

.then(data => {

    inboxData = data;

    displayMessages();

    updateNotification();

})

.catch(error => {

    console.log("API Error:", error);

});
    {
        id: 1,
        platform: "📧 Gmail",
        sender: "John",
        message: "Meeting reminder tomorrow",
        time: "10:30 AM",
        status: "Unread",
        starred: false
    },

    {
        id: 2,
        platform: "💬 Slack",
        sender: "Marketing Team",
        message: "New campaign update available",
        time: "9:15 AM",
        status: "Unread",
        starred: false
    },

    {
        id: 3,
        platform: "📅 Calendar",
        sender: "Calendar",
        message: "Project review at 3 PM",
        time: "Today",
        status: "Read",
        starred: false
    }

];


// Save messages
function saveMessages(){

    localStorage.setItem(
        "inboxData",
        JSON.stringify(inboxData)
    );

}



// Display messages
function displayMessages(messages = inboxData){

    const inbox =
    document.getElementById("inbox");


    if(!inbox) return;


    inbox.innerHTML = "";


    messages.forEach(function(item,index){


        const messageCard =
        document.createElement("div");


        messageCard.className="message";


        messageCard.innerHTML = `

        <div onclick="openMessage(${index})"
        style="cursor:pointer;">

        <h3>
        ${item.starred ? "⭐" : ""}
        ${item.platform}
        </h3>


        <p>
        <b>${item.sender}:</b>
        ${item.message}
        </p>

${item.attachment ? "📎 " + item.attachment : ""}

        <small>
        ${item.time} -
        ${item.status}
        </small>


        </div>


        <br>


        <button onclick="toggleStar(${index})">
        ⭐ Star
        </button>


        <button onclick="markRead(${index})">
        ✅ Read
        </button>


        <button onclick="markUnread(${index})">
        📩 Unread
        </button>


        <button onclick="archiveMessage(${index})">
        📦 Archive
        </button>


        <button onclick="deleteMessage(${index})">
        🗑️ Delete
        </button>

        `;


        inbox.appendChild(messageCard);


    });


    updateNotification();

}




function markRead(index){

    const id = inboxData[index].id;


    fetch(`http://localhost:3000/messages/${id}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:"Read"
        })

    })

    .then(response => response.json())

    .then(data => {

        inboxData[index] = data;

        displayMessages();

    });

}



// Mark unread
function markUnread(index){

    const id = inboxData[index].id;


    fetch(`http://localhost:3000/messages/${id}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:"Unread"
        })

    })

    .then(response => response.json())

    .then(data => {

        inboxData[index] = data;

        displayMessages();

    });

}



// Star message
function toggleStar(index){

    const id = inboxData[index].id;

    const newStar =
    !inboxData[index].starred;


    fetch(`http://localhost:3000/messages/${id}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            starred:newStar
        })

    })

    .then(response => response.json())

    .then(data => {

        inboxData[index] = data;

        displayMessages();

    });

}


// Archive
function archiveMessage(index){

    const id = inboxData[index].id;


    fetch(`http://localhost:3000/messages/${id}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:"Archived"
        })

    })

    .then(response => response.json())

    .then(data => {

        inboxData[index] = data;

        displayMessages();

    });

}


// Delete
function deleteMessage(index){

    const id = inboxData[index].id;


    fetch(`http://localhost:3000/messages/${id}`, {

        method:"DELETE"

    })

    .then(response => response.json())

    .then(data => {

        inboxData.splice(index,1);

        displayMessages();

    });

}


// Search
function searchMessages(){

    const keyword =
    document.getElementById("searchBox")
    .value
    .toLowerCase();



    const filtered =
    inboxData.filter(function(item){


        return (

            item.sender.toLowerCase()
            .includes(keyword)


            ||

            item.message.toLowerCase()
            .includes(keyword)


            ||

            item.platform.toLowerCase()
            .includes(keyword)

        );


    });


    displayMessages(filtered);

}



// Platform filter
function filterMessages(){


    const selected =
    document.getElementById("platformFilter")
    .value;



    if(selected==="All"){

        displayMessages();

        return;

    }



    const filtered =
    inboxData.filter(function(item){

        return item.platform.includes(selected);

    });



    displayMessages(filtered);

}



// Open message details
function openMessage(index){


    localStorage.setItem(
        "selectedMessage",
        JSON.stringify(inboxData[index])
    );


    window.location.href="message.html";


}



// Notification count
function updateNotification(){


    const notification =
    document.getElementById("notification");


    if(!notification) return;



    const unread =
    inboxData.filter(function(item){

        return item.status==="Unread";

    });



    notification.textContent =
    "🔔 " + unread.length;


}




// User session

const currentUser =
JSON.parse(localStorage.getItem("user"));



const welcome =
document.getElementById("welcome");



if(currentUser && welcome){

    welcome.textContent =
    "Welcome " + currentUser.username;

}




// Logout
function logout(){

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("user");

    window.location.href="login.html";

}


// Start app

initApp();

function toggleDarkMode(){

    document.body.classList.toggle("dark");


    const mode =
    document.body.classList.contains("dark");


    localStorage.setItem(
        "darkMode",
        mode
    );

}


if(localStorage.getItem("darkMode") === "true"){

    document.body.classList.add("dark");

}

const profileUser =
JSON.parse(localStorage.getItem("user"));


if(profileUser){

    const username =
    document.getElementById("username");


    const email =
    document.getElementById("email");


    if(username){

        username.textContent =
        profileUser.username;

    }


    if(email){

        email.textContent =
        profileUser.email || "Not added";

    }

}

function checkNewMessages(){

    const notification =
    document.getElementById("notification");


    if(!notification) return;


    const unread =
    inboxData.filter(function(item){

        return item.status === "Unread";

    });


    notification.textContent =
    unread.length;


}


checkNewMessages();


function loadUserProfile(){

    const user =
    JSON.parse(localStorage.getItem("user"));


    const username =
    document.getElementById("username");


    if(user && username){

        username.textContent =
        user.username;

    }

}

function loadDarkMode(){

    if(localStorage.getItem("darkMode") === "true"){

        document.body.classList.add("dark");

    }

}

function initApp(){

    checkSession();

    displayMessages();

    updateNotification();

    loadDarkMode();

    loadUserProfile();

}

function register(){

    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;


    fetch("http://localhost:3000/auth/register", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username: username,

            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

    })

    .catch(error => {

        console.log(error);

    });

}

function login(){

    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;


    fetch("http://localhost:3000/auth/login", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username: username,

            password: password

        })

    })

    .then(response => response.json())

    .then(data => {


        if(data.user){


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            localStorage.setItem(
                "loggedIn",
                "true"
            );


            alert("Login successful!");


            window.location.href="index.html";


        }

        else{


            alert(data.message);


        }


    })

    .catch(error => {

        console.log(error);

    });

}
