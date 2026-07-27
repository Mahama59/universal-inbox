// ======================================================
// Universal Inbox v2.0
// Production Ready Frontend
// ======================================================

console.log("Universal Inbox v2 running");


// ==============================
// API Configuration
// ==============================

const API_URL = "http://localhost:3000";

let inboxData = [];

let token = localStorage.getItem("token");

let currentUser =
JSON.parse(localStorage.getItem("user"));



// ==============================
// Session Protection
// ==============================

function checkSession(){

    const publicPages = [
        "login.html"
    ];


    const page =
    window.location.pathname;


    const isLoginPage =
    publicPages.some(item =>
        page.includes(item)
    );


    if(!token && !isLoginPage){

        window.location.href="login.html";

        return false;

    }


    return true;

}



// ==============================
// API Helper
// ==============================

async function api(endpoint, options={}){


    const response = await fetch(
        API_URL + endpoint,
        {

            headers:{

                "Content-Type":"application/json",

                "Authorization":
                "Bearer " + token

            },

            ...options

        }
    );


    if(response.status === 401){

        logout();

        return;

    }


    return await response.json();

}


// ==============================
// Authentication
// ==============================


// Register User

async function register(){

    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;


    if(!username || !password){

        alert("Please enter username and password");

        return;

    }


    const response =
    await fetch(API_URL + "/auth/register",
    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,
            password

        })

    });


    const data =
    await response.json();


    alert(data.message);


}



// Login User

async function login(){

    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;



    const response =
    await fetch(API_URL + "/auth/login",
    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,
            password

        })

    });



    const data =
    await response.json();



    if(data.token){


        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert("Login successful");


        window.location.href="index.html";


    }

    else{


        alert(
            data.message ||
            "Login failed"
        );


    }


}




// Logout

function logout(){


    localStorage.removeItem("token");


    localStorage.removeItem("user");


    localStorage.removeItem("loggedIn");


    window.location.href="login.html";


}

// ==============================
// Load User Messages
// ==============================


async function loadMessages(){

    const data = await api("/messages");


    if(!data){

        return;

    }


    inboxData = data;


    displayMessages();


    updateNotification();


}

// ==============================
// Message Actions
// ==============================


// Mark Read

async function markRead(index){

    const id = inboxData[index].id;


    const data = await api(
        `/messages/${id}`,
        {
            method:"PUT",

            body:JSON.stringify({

                status:"Read"

            })

        }
    );


    inboxData[index] = data;

    displayMessages();

    updateNotification();

}



// Mark Unread

async function markUnread(index){

    const id = inboxData[index].id;


    const data = await api(
        `/messages/${id}`,
        {
            method:"PUT",

            body:JSON.stringify({

                status:"Unread"

            })

        }
    );


    inboxData[index] = data;

    displayMessages();

    updateNotification();

}



// Star Message

async function toggleStar(index){

    const id =
    inboxData[index].id;


    const data = await api(
        `/messages/${id}`,
        {
            method:"PUT",

            body:JSON.stringify({

                starred:
                !inboxData[index].starred

            })

        }
    );


    inboxData[index] = data;


    displayMessages();

}



// Archive Message

async function archiveMessage(index){

    const id =
    inboxData[index].id;


    const data = await api(
        `/messages/${id}`,
        {
            method:"PUT",

            body:JSON.stringify({

                status:"Archived"

            })

        }
    );


    inboxData[index] = data;


    displayMessages();

}



// Delete Message

async function deleteMessage(index){

    const id =
    inboxData[index].id;


    await api(
        `/messages/${id}`,
        {

            method:"DELETE"

        }
    );


    inboxData.splice(index,1);


    displayMessages();


    updateNotification();

}

// ==============================
// Search Messages
// ==============================

function searchMessages(){

    const keyword =
    document.getElementById("searchBox")
    .value
    .toLowerCase();


    const filtered =
    inboxData.filter(item => {


        return (

            item.sender
            .toLowerCase()
            .includes(keyword)


            ||

            item.message
            .toLowerCase()
            .includes(keyword)


            ||

            item.platform
            .toLowerCase()
            .includes(keyword)

        );


    });


    displayMessages(filtered);

}



// ==============================
// Platform Filter
// ==============================

function filterMessages(){

    const selected =
    document.getElementById("platformFilter")
    .value;


    if(selected === "All"){

        displayMessages();

        return;

    }


    const filtered =
    inboxData.filter(item =>

        item.platform.includes(selected)

    );


    displayMessages(filtered);

}



// ==============================
// Notifications
// ==============================

function updateNotification(){

    const notification =
    document.getElementById("notification");


    if(!notification){

        return;

    }


    const unread =
    inboxData.filter(item =>

        item.status === "Unread"

    );


    notification.textContent =
    "🔔 " + unread.length;

}



// ==============================
// Open Message
// ==============================

function openMessage(index){

    localStorage.setItem(
        "selectedMessage",
        JSON.stringify(
            inboxData[index]
        )
    );


    window.location.href =
    "message.html";

}



// ==============================
// User Profile
// ==============================

function loadUserProfile(){

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );


    const username =
    document.getElementById("username");


    const email =
    document.getElementById("email");


    if(user && username){

        username.textContent =
        user.username;

    }


    if(user && email){

        email.textContent =
        user.email ||
        "Not added";

    }

}



// ==============================
// Dark Mode
// ==============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");


    const enabled =
    document.body
    .classList
    .contains("dark");


    localStorage.setItem(
        "darkMode",
        enabled
    );

}



function loadDarkMode(){

    const mode =
    localStorage.getItem("darkMode");


    if(mode === "true"){

        document.body
        .classList
        .add("dark");

    }

}

// ==============================
// Application Start
// ==============================


function initApp(){

    checkSession();


    if(token){

        loadMessages();

    }


    loadUserProfile();


    loadDarkMode();


}



// Start Application

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
                
