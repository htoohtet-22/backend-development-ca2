document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const taskId = urlParams.get("task_id");
    const doTaskForm = document.getElementById("doTaskForm");
  
    doTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const callbackForSubmission = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
  
            if (responseStatus === 200) {
                window.location.href = "../task.html";
            } else {
                alert(responseData.message);
            }
        };
  
        const notes = document.getElementById("notes").value;
        const data = {
            notes: notes,
        };
        
        fetchMethod(currentUrl + "/api/task/" + taskId, callbackForSubmission, "POST", data, localStorage.getItem("token"));
    });
  
    
  });
  