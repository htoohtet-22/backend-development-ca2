//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const cityController = require('../controllers/cityController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/', cityController.getAllCities);
router.post('/', jwtMiddleware.verifyToken, cityController.createNewCity);
router.put('/:cityId', jwtMiddleware.verifyToken, cityController.updateCityById);
router.delete('/:cityId', jwtMiddleware.verifyToken, cityController.deleteCityById);
router.get('/user', jwtMiddleware.verifyToken, cityController.getCityByUserId);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;