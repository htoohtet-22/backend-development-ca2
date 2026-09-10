//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL CITIES
//////////////////////////////////////////////////////
module.exports.selectAllCities = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT *
    FROM City;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// SELECT CITY BY USER ID
//////////////////////////////////////////////////////
module.exports.selectCityByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT *
    FROM City
    WHERE user_id = ?;
    `;

    const VALUES = [data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// INSERT NEW CITY
//////////////////////////////////////////////////////
module.exports.insertNewCity = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO City(name, user_id)
    VALUES (?, ?);
        
    SELECT *
    FROM City
    WHERE id = LAST_INSERT_ID();
    `;

    const VALUES = [data.name, data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE CITY BY ID
//////////////////////////////////////////////////////
module.exports.updateCityById = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE City
    SET name = ?
    WHERE id = ?;
    `;

    const VALUES = [data.name, data.cityId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE CITY BY ID
//////////////////////////////////////////////////////
module.exports.deleteCityById = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE
    FROM City
    WHERE id = ?;
    `;

    const VALUES = [data.cityId];

    pool.query(SQLSTATEMENT, VALUES, callback);
}