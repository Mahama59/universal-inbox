// Slack Service

function connectSlack(){

    return {
        status:"Slack connection ready"
    };

}


function getSlackMessages(){

    return [
        {
            platform:"💬 Slack",
            sender:"Slack Team",
            message:"Slack messages will appear here",
            status:"Unread",
            starred:false
        }
    ];

}


module.exports = {
    connectSlack,
    getSlackMessages
};
