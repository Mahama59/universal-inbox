// Gmail Service

function connectGmail(){

    return {
        status: "Gmail connection ready"
    };

}


function getGmailMessages(){

    return [
        {
            platform:"📧 Gmail",
            sender:"Demo Gmail User",
            message:"Gmail connection will appear here",
            status:"Unread",
            starred:false
        }
    ];

}


module.exports = {
    connectGmail,
    getGmailMessages
};
