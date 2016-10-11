'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var User = require('../middleware/auth');
/* GET home page. */
// router.get('/', function(req, res, next) {
//
// });
router.get('/',User.isLoggedIn,function(req,res,next){
  
})

router.post('/',User.isLoggedIn,function(req, res, next){
  User.createLists(req,res);
});

router.patch('/:id',User.isLoggedIn,function(req,res,next){
  User.editLists(req,res);
})
module.exports = router;
