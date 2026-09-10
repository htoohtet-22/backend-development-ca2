//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL MESSAGES
//////////////////////////////////////////////////////
module.exports.selectAllMessages = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT Message.*, User.username
    FROM Message
    INNER JOIN User ON Message.user_id = User.id
    ORDER BY created_at ASC;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// INSERT NEW MESSAGE
//////////////////////////////////////////////////////
module.exports.insertNewMessage = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO Message(user_id, message_text)
    VALUES (?, ?);
        
    SELECT * 
    FROM Message
    WHERE id = LAST_INSERT_ID();
    `;

    const VALUES = [data.userId, data.message];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE MESSAGE BY ID
//////////////////////////////////////////////////////
module.exports.updateMessageById = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE Message
    SET message_text = ?,
        last_updated_at = CURRENT_TIMESTAMP()
    WHERE id = ?;
    `;

    const VALUES = [data.message, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE MESSAGE BY ID
//////////////////////////////////////////////////////
module.exports.deleteMessageById = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE
    FROM Message
    WHERE id = ?;
    `;

    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
