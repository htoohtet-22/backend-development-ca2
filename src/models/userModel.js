//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL USERS
//////////////////////////////////////////////////////
module.exports.selectAllUsers = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, username, email, created_at, last_logged_in_at FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectUserByUsername = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, username, email, password, created_at, last_logged_in_at
    FROM User
    WHERE username = ?;
    `;

    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectUserByUsernameOrEmail = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, username, email, created_at, last_logged_in_at
    FROM User
    WHERE username = ? OR email = ?`;

    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// INSERT NEW USER
//////////////////////////////////////////////////////
module.exports.insertNewUser = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO User(username, email, password)
    VALUES (?, ?, ?);

    SELECT id, username, email, created_at, last_logged_in_at
    FROM User
    ORDER BY id DESC
    LIMIT 1;
    `;

    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USER ID
//////////////////////////////////////////////////////
module.exports.selectUserAndCityByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, username, email, created_at, last_logged_in_at, envi_points, eco_points, social_points
    FROM User
    WHERE id = ?;
    
    SELECT *
    FROM City
    WHERE user_id = ?;`;

    const VALUES = [data.userId, data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE USER BY LAST LOGGED IN AT
//////////////////////////////////////////////////////
module.exports.updateUserByLastLoggedInAt = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET last_logged_in_at = CURRENT_TIMESTAMP()
    WHERE id = ?;
    `;

    const VALUES = [data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE USER BY USER ID
//////////////////////////////////////////////////////
module.exports.updateUserByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET username = ?
    WHERE id = ?;
    `;

    const VALUES = [data.username, data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE USER BY ID
//////////////////////////////////////////////////////
module.exports.deleteUserByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE
    FROM User
    WHERE id = ?;
    `;

    const VALUES = [data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}