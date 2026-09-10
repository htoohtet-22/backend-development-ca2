document.addEventListener("DOMContentLoaded", function () {
    const callbackForProfile = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const profileInfo = document.getElementById("profileInfo");
        const cityInfo = document.getElementById("cityInfo");

        if (responseStatus === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        }

        profileInfo.innerHTML = `
        <h1 class ="text-center mb-2">Hello, ${responseData[0][0].username}!</h1>
        <div class="card">
            <div class="card-body text-center">
                <p class="card-text">
                    Username: ${responseData[0][0].username} <br>
                    User ID: ${responseData[0][0].id} <br>
                    Email: ${responseData[0][0].email} <br>
                    Created at: ${responseData[0][0].created_at} <br>
                    Last logged in at: ${responseData[0][0].last_logged_in_at}
                </p>
                <p class="card-text">
                    Environment points: ${responseData[0][0].envi_points} <br>
                    Economic points: ${responseData[0][0].eco_points} <br>
                    Social points: ${responseData[0][0].social_points}
                </p>
            </div>
            <div class="d-grid gap-2 m-2 d-md-flex justify-content-md-end">
                <a href="#" class="btn btn-warning me-md-2" id="updateUser-${responseData[0][0].id}">Update</a>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</a>
            </div>
            <div class="modal fade" id="deleteUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Are you sure?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Once your user account is deleted, it cannot be traced back!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary float-start" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" id="deleteUserButton">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const updateUserButton = document.getElementById(`updateUser-${responseData[0][0].id}`);
        updateUserButton.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = `updateUser.html?user_id=${responseData[0][0].id}`;
        });

        const deleteUserButton = document.getElementById(`deleteUserButton`);
        deleteUserButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                localStorage.removeItem("token");
                window.location.href = "login.html";
            };
            fetchMethod(currentUrl + "/api/user/" + responseData[0][0].id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
        });
        
        if (responseData[1].length === 0) {
            cityInfo.innerHTML = `
            <button type="button" class="btn btn-primary col-4 mx-auto mt-3 text-center" data-bs-toggle="modal" data-bs-target="#createCityModal">
                Build a city!
            </button>

            <div class="modal fade" id="createCityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Name the city!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="cityForm">
                                <div class="mb-3">
                                    <label for="cityName" class="col-form-label">Input the name of your city here</label>
                                    <input type="text" class="form-control" id="cityName">
                                </div>
                                <div id="warningCard" class="card border-danger mb-3 d-none">
                                    <div class="card-body text-danger">
                                        <p id="warningText" class="card-text"></p>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary float-end">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            `;

            const cityForm = document.getElementById("cityForm");
            const warningCard = document.getElementById("warningCard");
            const warningText = document.getElementById("warningText");

            cityForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const cityName = document.getElementById("cityName").value;
                
                const data = {
                    name: cityName
                };
                
                const callback = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    if (responseStatus === 201) {
                        window.location.href = "profile.html";
                    } else {
                        warningCard.classList.remove("d-none");
                        warningText.innerText = responseData.message;
                    }
                };

                fetchMethod(currentUrl + "/api/city", callback, "POST", data, localStorage.getItem("token"));

                cityForm.reset();
            });
        } else {
            cityInfo.innerHTML = `
            <h4 class ="text-center mt-3 mb-2">This is your city, ${responseData[0][0].username}!</h4>
            <div class="card">
                <div class="card-body text-center">
                    <p class="card-text">
                        City name: ${responseData[1][0].name} <br>
                        City ID: ${responseData[1][0].id} <br>
                        Created at: ${responseData[1][0].created_at}
                    </p>
                    <p class="card-text">
                        Housing: ${responseData[1][0].housing} <br>
                        Power Supply: ${responseData[1][0].power_supply} <br>
                        Market: ${responseData[1][0].market}
                    </p>
                </div>
                <div class="d-grid gap-2 m-2 d-md-flex justify-content-md-end">
                    <a href="#" class="btn btn-warning me-md-2" id="updateCity-${responseData[1][0].id}">Update</a>
                    <a href="#" class="btn btn-danger" id="deleteCity-${responseData[1][0].id}">Delete</a>
                </div>
            </div>
            `;

            const updateCityButton = document.getElementById(`updateCity-${responseData[1][0].id}`);
            updateCityButton.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = `updateCity.html?city_id=${responseData[1][0].id}`;
            });

            const deleteCityButton = document.getElementById(`deleteCity-${responseData[1][0].id}`);
            deleteCityButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForDelete = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    window.location.reload();
                };
                fetchMethod(currentUrl + "/api/city/" + responseData[1][0].id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
            });
        }
    };

    fetchMethod(currentUrl + `/api/user/profile`, callbackForProfile, "GET", null, localStorage.getItem("token"));
});