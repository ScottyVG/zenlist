'use strict'
var express = require('express');
var router = express.Router();

var User = require('../middleware/auth')

router.get('/', User.isLoggedIn, function(req, res, next) {
    // new Promise(function(resolve,reject){

      // var Lists = User.getLists(req,res)
      // resolve()
    // })
User.testforjoin(req,res);
// console.log('stuff and things',User.renderUserObj(req,res));

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
