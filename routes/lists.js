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

<<<<<<< HEAD
router.post('/edit',User.isLoggedIn,function(req,res,next){
  console.log('edit post',req.body);
=======

router.patch('/:id',User.isLoggedIn,function(req,res,next){
>>>>>>> 3351c1a5dcf891f8c3df10b1a0bba37733dafa5c
  User.editLists(req,res);
})


module.exports = router;
