//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/userModel.js");

//////////////////////////////////////////////////////
// GET ALL USERS
//////////////////////////////////////////////////////
module.exports.getAllUsers = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getllUsers:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAllUsers(callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) =>
{
    if (req.body.username === undefined || req.body.password === undefined) {
        res.status(400).json({
            message: "Missing required information: username or password."
        });
        return;
    }
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                res.locals.hash = results[0].password;
                res.locals.userId = results[0].id;
                next();
            }
        }
    }

    model.selectUserByUsername(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR UPDATING LAST LOGGED IN AT
//////////////////////////////////////////////////////
module.exports.updateLastLoggedInAt = (req, res, next) =>
{
    const data = {
        userId: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } 
        else {
            next();
        }
    }

    model.updateUserByLastLoggedInAt(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) =>
{
    if (req.body.username === undefined || req.body.username === "" || req.body.email === undefined || req.body.email === "" || req.body.password === undefined|| req.body.password === "") {
        res.status(400).json({
            message: "Missing required information."
        });
        return;
    }
    
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } 
        else {
            res.locals.userId = results[1][0].id;
            res.locals.message = `User ${results[1][0].username} created successfully.`
            next();
        }
    }

    model.insertNewUser(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) =>
{
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.length !== 0) {
                res.status(409).json({
                    message: "Username or email already exists."
                })
            } else next();
        }
    }

    model.selectUserByUsernameOrEmail(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////
module.exports.checkIfPlayerBelongsToUser = (req, res, next) =>
{
    const data = {
        userId : res.locals.userId,
        playerId : req.params.playerId || req.body.playerId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkIfPlayerBelongsToUser:", error);
            res.status(500).json(error);
        } 
        else {
            if (results[0].length === 0){
                res.status(400).json({
                    message: `Player ${data.playerId} not found.`
                })
            }
            else {
                if (results[1].length === 0) {
                    res.status(409).json({
                        message: `Player ${data.playerId} does not belong to User ${data.userId}.`
                    })
                    
                }
                else next();
            }
        }
    }

    model.selectPlayerByUserId(data, callback);
}

//////////////////////////////////////////////////////
// GET USER AND CITY OF USER
//////////////////////////////////////////////////////
module.exports.getUserAndCityOfUser = (req, res, next) =>
{
    const data = {
        userId: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserByUserId:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.length === 0) {
                res.status(404).json({
                    message: `User ${data.userId} not found.`
                })
                res.locals.message = `User ${data.userId} not found.`
            } else {
                res.status(200).json(results);
            }
        }
    }

    model.selectUserAndCityByUserId(data, callback);
}

//////////////////////////////////////////////////////
// GET USER AND CITY BY USER ID
//////////////////////////////////////////////////////
module.exports.getUserAndCityByUserId = (req, res, next) =>
{
    const data = {
        userId: req.params.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserByUserId:", error);
            res.status(500).json(error);
        } 
        else {
            if (results.length === 0) {
                res.status(404).json({
                    message: `User ${data.userId} not found.`
                })
                res.locals.message = `User ${data.userId} not found.`
            } else {
                res.status(200).json(results);
            }
        }
    }

    model.selectUserAndCityByUserId(data, callback);
}

//////////////////////////////////////////////////////
// UPDATE USER BY USER ID
//////////////////////////////////////////////////////
module.exports.updateUserByUserId = (req, res, next) =>
{
    if (req.body.username === undefined || req.body.username == "") {
        res.status(400).json({
            message: "Please enter the user's name."
        });
        return;
    }
    
    const data = {
        userId: req.params.userId,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserByUserId:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(200).json({
                message: `User ${data.userId} updated successfully.`
            });
        }
    }

    model.updateUserByUserId(data, callback);
}

//////////////////////////////////////////////////////
// DELETE USER BY USER ID
//////////////////////////////////////////////////////
module.exports.deleteUserByUserId = (req, res, next) =>
{   
    const data = {
        userId: req.params.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByUserId:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(204).end();
        }
    }

    model.deleteUserByUserId(data, callback);
}