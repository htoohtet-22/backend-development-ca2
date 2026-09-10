//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL TASKS
//////////////////////////////////////////////////////
module.exports.selectAllTasks = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT *
    FROM Task;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// DO TASK BY CHAR ID
//////////////////////////////////////////////////////
module.exports.doTaskByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET envi_points = envi_points + (SELECT points FROM Task where id = ?)
    WHERE id = ?;
    
    INSERT INTO TaskProgress (user_id, task_id, notes)
    VALUES (?, ?, ?);
    
    SELECT envi_points
    FROM User
    WHERE id = ?;
    `;

    const VALUES = [data.taskId, data.userId, data.userId, data.taskId, data.notes, data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}