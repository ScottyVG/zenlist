'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var User = require('../middleware/auth');
/* GET home page. */
router.get('/:id',User.isLoggedIn, function(req,res,next){
  console.log('get tasks req.body', req.body);
})

// router.post('/', function(req, res, next){
// res.send('hello');
// })
router.post('/:id', User.isLoggedIn, function(req, res, next) {
  console.log('hello log');
  User.createTasks(req,res);
  // res.send('hello')
  // res.send('hello send');

});

router.post('/edit',User.isLoggedIn, function(req, res, next){
  User.editTasks(req,res);
})

router.delete('/d/:id', User.isLoggedIn, function(req, res, next){
  User.deleteTasks(req, res);
})
module.exports = router;
