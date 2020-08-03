const express = require('express');
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const contactController = require('./controllers/contactController');
const verifyLogged = require('./middlewares/verifyLogged');

const router = express.Router();

// Home
router.get('/', homeController.index);

// Login
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/sign', loginController.login);
router.get('/logout', loginController.logout);

// Contact
router.get('/contact', verifyLogged, contactController.index);
router.get('/contact/:id', verifyLogged, contactController.editIndex);
router.get('/contact/delete/:id', verifyLogged, contactController.delete);
router.post('/contact', verifyLogged, contactController.register);
router.post('/contact/edit', verifyLogged, contactController.edit);

module.exports = router;
