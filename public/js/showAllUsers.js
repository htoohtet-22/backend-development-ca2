document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const userList = document.getElementById("userList");
        responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 p-3 d-flex";
            if (parseInt(localStorage.getItem("userId")) === user.id) {
                displayItem.innerHTML = `
                <div class="card h-100 w-100 text-center">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${user.username}</h5>
                        <p class="card-text d-flex flex-column">
                            User ID: ${user.id} <br>
                            Email: ${user.email} <br>
                            Created at: ${user.created_at} <br>
                            Last logged in at: ${user.last_logged_in_at} <br>
                        </p>
                    </div>
                    <a href="profile.html" class="btn btn-success">View yourself</a>
                </div> 
                `;
            } else {
                displayItem.innerHTML = `
                <div class="card h-100 w-100 text-center">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${user.username}</h5>
                        <p class="card-text d-flex flex-column">
                            User ID: ${user.id} <br>
                            Email: ${user.email} <br>
                            Created at: ${user.created_at} <br>
                            Last logged in at: ${user.last_logged_in_at} <br>
                        </p>
                    </div>
                    <a href="showSingleUserInfo.html?user_id=${user.id}" class="btn btn-warning">View this user</a>
                </div> 
                `;
            }
            userList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/user", callback);
});