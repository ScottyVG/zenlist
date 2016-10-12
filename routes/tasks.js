'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var User = require('../middleware/auth');
/* GET home page. */
router.get('/:id',User.isLoggedIn, function(req,res,next){
  console.log('get tasks req.body', req.body);
})

router.post('/', User.isLoggedIn, function(req, res, next) {
  console.log(req.body);
  User.createTasks(req,res);
});

router.post('/edit',User.isLoggedIn, function(req, res, next){

  User.editTasks(req,res);
})
module.exports = router;
