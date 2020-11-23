const express = require('express');

const verifyToken = require('./config/verifyToken');
const loginController = require('./controllers/loginController');
const namespaceController = require('./controllers/namespaceController');
const userController = require('./controllers/userController');

const router = express.Router();

//auth routes
router.post('/login', loginController.login);
router.post('/user/register', userController.createUser);
router.get('/user/:userId', verifyToken, userController.getUserById);

//namespace routes
router.post('/namespace/create', verifyToken, namespaceController.createNamespace);

module.exports = router;
