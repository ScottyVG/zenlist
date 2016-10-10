'use strict'

var express = require('express');
var router = express.Router();

  var login = require('./login');
  var signup = require('./signup');
  var users = require('./users');
  var logout = require('./logout');

  router.use('/signup', signup);
  router.use('/login', login);
  router.use('/users', users);
  router.use('/logout', logout);

  router.get('/',function(req, res, next) {
    res.render('index', { title: 'Zen List Focus'});
  });

module.exports = router;
