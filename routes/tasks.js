'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var User = require('../middleware/auth');
/* GET home page. */
router.post('/', User.isLoggedIn, function(req, res, next) {
  User.createTasks(req,res);
});

module.exports = router;
