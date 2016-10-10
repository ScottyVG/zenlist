'use strict'
var express = require('express');
var router = express.Router();

var User = require('../middleware/auth')
router.get('/', User.isLoggedIn, function(req, res, next) {
    console.log('profile', req.user);
    res.render('profile', {
        user: {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email
        }
    });
});

module.exports = router;
