'use strict'

var express = require('express');
var router = express.Router();

  var login = require('./login');
  var signup = require('./signup');
  var users = require('./users');
  var logout = require('./logout');
  var lists = require('./lists');
  var tasks = require('./tasks');

  router.use('/signup', signup);
  router.use('/login', login);
  router.use('/users', users);
  router.use('/logout', logout);
  router.use('/lists', lists);
  router.use('/tasks',tasks);

  router.get('/',function(req, res, next) {
    res.render('index', { title: 'Zen List Focus'});
  });

module.exports = router;
