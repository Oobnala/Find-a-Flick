const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user_controller');

router.post('/register', UsersController.register);
