const express = require('express');
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');

const router = express.Router();

// Home
router.get('/', homeController.index);

// Login
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);

module.exports = router;
