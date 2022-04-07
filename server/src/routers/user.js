
const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/login', userController.postlogin);
router.get('/getlogin', userController.getlogin);


module.exports = router;
