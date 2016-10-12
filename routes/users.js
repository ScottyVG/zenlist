'use strict'
var express = require('express');
var router = express.Router();

var User = require('../middleware/auth')

router.get('/', User.isLoggedIn, function(req, res, next) {

  //knex to db and grabe their info
  //get all the fields which might entail a join
  res.render('users', {
      data: data form knexcall
    })
    // new Promise(function(resolve,reject){

  // var Lists = User.getLists(req,res)
  // resolve()
  // })
  User.testforjoin(req, res);
  User.renderUser(req, res);

  // console.log('profile', req.user);
  // res.render('users', {
  //     user: {
  //         firstName: req.user.firstName,
  //         lastName: req.user.lastName,
  //         email: req.user.email
  //     },
  //     lists: Lists
  // });
  // console.log('get', Lists);
});

module.exports = router;
