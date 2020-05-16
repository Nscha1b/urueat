var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');


router.post('/signup', UserController.createUser);
router.post('/login', UserController.userLogin);


module.exports = router;
