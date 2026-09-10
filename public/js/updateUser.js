document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const userId = urlParams.get("user_id");
    const form = document.getElementById("updateUserForm");
  
    form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const callbackForUpdate = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
  
            if (responseStatus === 200) {
                window.location.href = "profile.html";
            } else {
                alert(responseData.message);
            }
        };
  
        const username = document.getElementById("username").value;
        const data = {
            username: username,
        };
        
        fetchMethod(currentUrl + "/api/user/" + userId, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
        form.reset();
    });
  
    
  });
  