//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const userRoutes = require('./userRoutes');
const userController = require('../controllers/userController');
const taskRoutes = require('../routes/taskRoutes');
const cityRoutes = require('./cityRoutes');
const messageRoutes = require('../routes/messageRoutes');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, userController.updateLastLoggedInAt, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get("/verify", jwtMiddleware.verifyToken, jwtMiddleware.showTokenVerified);

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/city", cityRoutes);
router.use("/message", messageRoutes);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;