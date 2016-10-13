'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var User = require('../middleware/auth');


router.get('/',User.isLoggedIn,function(req,res,next){
res.render('list')
})

router.post('/',User.isLoggedIn,function(req, res, next){
  User.createLists(req,res);
})


router.post('/edit',User.isLoggedIn,function(req,res,next){
  console.log('edit post',req.body);
  User.editLists(req,res);
})


module.exports = router;
