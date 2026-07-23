// Universal Inbox v0.3

console.log("Universal Inbox running");


const inboxData = [

    {
        platform: "📧 Gmail",
        sender: "John",
        message: "Meeting reminder tomorrow",
        time: "10:30 AM",
        status: "Unread"
    },

    {
        platform: "💬 Slack",
        sender: "Marketing Team",
        message: "New campaign update available",
        time: "9:15 AM",
        status: "Unread"
    },

    {
        platform: "📅 Calendar",
        sender: "Calendar",
        message: "Project review at 3 PM",
        time: "Today",
        status: "Read"
    }

];


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
