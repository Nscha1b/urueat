var express = require('express');
var router = express.Router();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_FACTOR = 10;

router.post('/signup', (req, res, next) => {
  bycrypt.hash(req.body.password, SALT_FACTOR)
  .then(hash => {
    const user = new User({
      email: req.body.password,
      password: hash,
    });

    user.save()
    .then(result => {
      res.status(200).json({
        message: 'User created successfully',
        result: result
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Invalid Authentication credentials'
      });
    }); 

  })
});



router.post('/login', (req, res, next) => {
  let user;

  User.findOne({ email: req.body.email })
  .then(foundUser => {

    if (!foundUser) {
      return res.status(401).json({
        message: 'Authentication Failed'
      })
    }

    user = foundUser;
    return bycrypt.compare(req.body.password, user.password)


  })
  .then(success => {

    if (!success) {
      return res.status(401).json({
        message: 'Invalid Authentication credentials'
      });
    }

    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      _id: user._id
    });

  }).catch(error => {
    return res.status(404).json({
      message: 'Error Authenticating user'
    });
  })

});


module.exports = router;
