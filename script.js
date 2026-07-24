// Universal Inbox v1.0


console.log("Universal Inbox running");


// Load messages from storage first
let inboxData =
JSON.parse(localStorage.getItem("inboxData")) || [

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




// Mark read
function markRead(index){

    inboxData[index].status="Read";

    saveMessages();

    displayMessages();

}



// Mark unread
function markUnread(index){

    inboxData[index].status="Unread";

    saveMessages();

    displayMessages();

}



// Star message
function toggleStar(index){

    inboxData[index].starred =
    !inboxData[index].starred;


    saveMessages();

    displayMessages();

}



// Archive
function archiveMessage(index){

    inboxData[index].status="Archived";

    saveMessages();

    displayMessages();

}



// Delete
function deleteMessage(index){

    inboxData.splice(index,1);

    saveMessages();

    displayMessages();

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

    window.location.href="login.html";

}



// Start app

displayMessages();

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
