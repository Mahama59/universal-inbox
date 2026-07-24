const messages = [

    {
        id: 1,
        userId: 1,
        platform: "📧 Gmail",
        sender: "John",
        message: "Meeting reminder tomorrow",
        time: "10:30 AM",
        status: "Unread",
        starred: false
    },

    {
        id: 2,
        userId: 1,
        platform: "💬 Slack",
        sender: "Marketing Team",
        message: "New campaign update available",
        time: "9:15 AM",
        status: "Unread",
        starred: false
    },

    {
        id: 3,
        userId: 1,
        platform: "📅 Calendar",
        sender: "Calendar",
        message: "Project review at 3 PM",
        time: "Today",
        status: "Read",
        starred: false
    }

];


module.exports = {
    messages
};
