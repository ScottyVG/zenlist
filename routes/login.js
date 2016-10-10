'use strict';

var express = require('express');
var router = express.Router();
var User = require('../middleware/auth')
var passport = require('passport')

router.get('/', (req, res) => {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash: true
}), (req, res, next) => {

});

module.exports = router;
