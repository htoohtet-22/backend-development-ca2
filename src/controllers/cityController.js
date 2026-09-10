//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/cityModel.js");

//////////////////////////////////////////////////////
// GET ALL CITIES
//////////////////////////////////////////////////////
module.exports.getAllCities = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        res.status(200).json(results);
    }

    model.selectAllCities(callback);
}

//////////////////////////////////////////////////////
// GET CITY BY USER ID
//////////////////////////////////////////////////////
module.exports.getCityByUserId = (req, res, next) =>
{
    const data = {
        userId: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error getCityByUserId:", error);
            res.status(500).error;
        }
        else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "No cities found."
                })
            }
            res.status(200).json(results);
        }
    }

    model.selectCityByUserId(callback);
}

//////////////////////////////////////////////////////
// CREATE NEW CITY
//////////////////////////////////////////////////////
module.exports.createNewCity = (req, res, next) =>
{   
    if (req.body.name === undefined || req.body.name === "") {
        res.status(400).json({
            message: "Please enter the city's name."
        });
        return;
    }

    const data = {
        name : req.body.name,
        userId : res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewCity:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(201).json(results[1][0]);
        }
    }

    model.insertNewCity(data, callback);
}

//////////////////////////////////////////////////////
// UPDATE CITY BY CITY ID
//////////////////////////////////////////////////////
module.exports.updateCityById = (req, res, next) =>
{
    if (req.body.name === undefined || req.body.name === "") {
        res.status(400).json({
            message: "Please enter the city's name."
        });
        return;
    }
    
    const data = {
        cityId: req.params.cityId,
        name: req.body.name
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateCityById:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(200).json({
                message: `City ${data.cityId} from User ${data.userId} updated successfully.`
            });
        }
    }

    model.updateCityById(data, callback);
}

//////////////////////////////////////////////////////
// DELETE CITY BY CITY ID
//////////////////////////////////////////////////////
module.exports.deleteCityById = (req, res, next) =>
{   
    const data = {
        cityId: req.params.cityId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCityById:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(204).end();
        }
    }

    model.deleteCityById(data, callback);
}