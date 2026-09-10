//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/taskModel.js");

//////////////////////////////////////////////////////
// GET ALL TASKS
//////////////////////////////////////////////////////
module.exports.getAllTasks = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        res.status(200).json(results);
    }

    model.selectAllTasks(callback);
}

//////////////////////////////////////////////////////
// DO TASK BY USER ID
//////////////////////////////////////////////////////
module.exports.doTaskByUserId = (req, res, next) =>
{   
    if (req.body.notes === undefined || req.body.notes === "") {
        res.status(400).json({
            message: "Enter notes for completion."
        })
        return;
    }
    const data = {
        userId: res.locals.userId,
        taskId: req.params.taskId,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error getAllCharactersByUserId:", error);
            res.status(500).error;
        }
        else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "No users found."
                })
            }
            res.status(200).json(results[2][0]);
        }
    }

    model.doTaskByUserId(data, callback);
}