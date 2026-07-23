// Universal Inbox App

console.log("Universal Inbox loaded");


const searchInput = document.querySelector(".search input");
const messages = document.querySelectorAll(".message");


searchInput.addEventListener("keyup", function(){

    let searchText = searchInput.value.toLowerCase();


    messages.forEach(function(message){

        let content = message.textContent.toLowerCase();


        if(content.includes(searchText)){
            message.style.display = "block";
        }
        else{
            message.style.display = "none";
        }

    });

});
