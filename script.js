// Universal Inbox v0.2

console.log("Universal Inbox running");


const inboxData = [
    {
        platform: "📧 Gmail",
        sender: "John",
        message: "Meeting reminder tomorrow",
        time: "10:30 AM",
        status: "Unread"
    },

const inbox = document.getElementById("inbox");


inboxData.forEach(function(item){

    const messageCard = document.createElement("div");

    messageCard.className = "message";


    messageCard.innerHTML = `
        <h3>${item.platform}</h3>
        <p><b>${item.sender}:</b> ${item.message}</p>
        <small>${item.time} - ${item.status}</small>
    `;


    inbox.appendChild(messageCard);

});
    
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


console.log(inboxData);
