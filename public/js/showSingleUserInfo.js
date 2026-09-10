document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const userId = urlParams.get("user_id");
  
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const userInfo = document.getElementById("userInfo");
        const cityInfo = document.getElementById("cityInfo");
    
        if (responseStatus === 404) {
            userInfo.innerHTML = `${responseData.message}`;
            return;
        }
    
        userInfo.innerHTML = `
            <h1 class ="text-center mb-2">Hello, this is ${responseData[0][0].username}!</h1>
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
        `;

        if (responseData[1].length === 0 ) {
            cityInfo.innerHTML = `
            <h4 class ="text-center mt-3 mb-2">This user is not governing any cities for now!</h4>
            `;
        } else {
            cityInfo.innerHTML = `
            <h4 class ="text-center mt-3 mb-2">This is ${responseData[0][0].username}'s city!</h4>
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
            </div>
            `;
        }
    };
  
    fetchMethod(currentUrl + `/api/user/${userId}`, callbackForUserInfo, "GET");
});