function saveMessage() {

    const sender = document.getElementById("sender").value.trim();
    const platform = document.getElementById("platform").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!sender || !platform || !message) {
        alert("Please fill in all fields.");
        return;
    }

    let inboxData =
        JSON.parse(localStorage.getItem("inboxData")) || [];

    const newMessage = {
        id: Date.now(),
        platform: platform,
        sender: sender,
        message: message,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        status: "Unread",
        starred: false
    };

    inboxData.unshift(newMessage);

    localStorage.setItem(
        "inboxData",
        JSON.stringify(inboxData)
    );

    alert("Message sent!");

    window.location.href = "index.html";
}
