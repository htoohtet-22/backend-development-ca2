//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/', userController.getAllUsers);
router.get('/profile', jwtMiddleware.verifyToken, userController.getUserAndCityOfUser);

router.get('/:userId', userController.getUserAndCityByUserId);
router.put('/:userId', jwtMiddleware.verifyToken, userController.updateUserByUserId);
router.delete('/:userId', jwtMiddleware.verifyToken, userController.deleteUserByUserId);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;