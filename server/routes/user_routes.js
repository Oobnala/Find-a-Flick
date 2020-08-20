const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user_controller');

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.put('/addToWatchlist', UsersController.addToWatchlist);
router.get('/getWatchlist', UsersController.getWatchlist);

module.exports = router;
