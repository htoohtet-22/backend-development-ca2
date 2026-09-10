document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const cityId = urlParams.get("city_id");
    const form = document.getElementById("updateCityForm");
  
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
  
        const name = document.getElementById("name").value;
        const data = {
            name: name,
        };
        
        fetchMethod(currentUrl + "/api/city/" + cityId, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
        form.reset();
    });
  
    
  });
  