document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const messageList = document.getElementById("messageList");
        responseData.forEach((message) => {
            const displayItem = document.createElement("div");
            if (parseInt(localStorage.getItem("userId")) === message.user_id) {
                displayItem.className = "text-end";
                displayItem.innerHTML = `
                <div class="d-inline-flex px-2 m-2 bg-light rounded-2 text-end">
                    <span>
                        <h5 class="pt-3">${message.username}</h5>
                        <p>${message.message_text}</p>
                    </span>
                </div>
                `;
            } else {
                displayItem.innerHTML = `
                <div class="d-inline-flex px-2 m-2 bg-light rounded-2 text-start">
                    <span>
                        <h5 class="pt-3">${message.username}</h5>
                        <p>${message.message_text}</p>
                    </span>
                </div>
                `;
            }
            messageList.appendChild(displayItem);
        });
        messageList.scrollTop = messageList.scrollHeight;

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const form = document.getElementById("sendMessage");

        if (token && userId) {
            form.classList.remove("d-none");
        }
  
        form.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const callbackForMessage = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
    
                if (responseStatus === 201) {
                    window.location.reload();
                } else {
                    alert(responseData.message);
                }
            };
    
            const message_text = document.getElementById("message_text").value;
            const data = {
                message: message_text,
            };
            
            fetchMethod(currentUrl + "/api/message", callbackForMessage, "POST", data, localStorage.getItem("token"));
        });
    };

    fetchMethod(currentUrl + "/api/message", callback);

});