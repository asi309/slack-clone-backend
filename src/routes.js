const express = require('express');

const verifyToken = require('./config/verifyToken');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

const router = express.Router();

//auth routes
router.post('/login', loginController.login);
router.post('/user/register', userController.createUser);
router.get('/user/:userId', verifyToken, userController.getUserById);

module.exports = router;
