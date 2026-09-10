//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/messageModel.js");

//////////////////////////////////////////////////////
// GET ALL MESSAGES
//////////////////////////////////////////////////////
module.exports.getAllMessages = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        res.status(200).json(results);
    }

    model.selectAllMessages(callback);
}

//////////////////////////////////////////////////////
// CREATE A NEW MESSAGE
//////////////////////////////////////////////////////
module.exports.createNewMessage = (req, res, next) =>
{   
    if (req.body.message === undefined || req.body.message === "") {
        res.status(400).json({
            message: "Please enter a message."
        });
        return;
    }

    const data = {
        message : req.body.message,
        userId : res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewMessage:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(201).json(results[1][0]);
        }
    }

    model.insertNewMessage(data, callback);
}

//////////////////////////////////////////////////////
// UPDATE PLAYER BY PLAYER ID
//////////////////////////////////////////////////////
module.exports.updateMessageById = (req, res, next) =>
{
    if (req.body.message === undefined || req.body.message === "") {
        res.status(400).json({
            message: "Please enter a message."
        });
        return;
    }
    
    const data = {
        id: req.params.messageId,
        message: req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(201).json({
                message: `Message ${data.characterId} from User ${data.userId} updated successfully.`
            });
        }
    }

    model.updateMessageById(data, callback);
}

//////////////////////////////////////////////////////
// DELETE PLAYER BY MESSAGE ID
//////////////////////////////////////////////////////
module.exports.deleteMessageById = (req, res, next) =>
{   
    const data = {
        id: req.params.messageId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(204).end();
        }
    }

    model.deleteMessageById(data, callback);
}