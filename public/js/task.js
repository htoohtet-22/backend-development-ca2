document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const taskList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 p-3 d-flex";
            displayItem.innerHTML = `
                <div class="card h-100 w-100 text-center">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">Task ${task.id}</h5>
                        <p class="card-text d-flex flex-column">
                            Title: ${task.title} <br>
                            Description: ${task.description}
                        </p>
                        <p class"card-text d-flex flex-column">
                            You will ${task.points} environment points.
                        </p>
                    </div>
                    <button class="btn btn-danger d-none" id="doTask-${task.id}">Do it!</button>
                </div>
            `;
            taskList.appendChild(displayItem);

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const doTaskButton = document.getElementById(`doTask-${task.id}`);
            if (token && userId) {
                doTaskButton.classList.remove("d-none");
            }
            doTaskButton.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = `doTask.html?task_id=${task.id}`;
            });
        });
    };

    fetchMethod(currentUrl + "/api/task", callback);
});