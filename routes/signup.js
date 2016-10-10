'use strict';

var express = require('express');
var knex = require('../db/knex');
var passport = require('passport');
var router = express.Router();
var User = require('../middleware/auth');


    router.get('/', function(req, res, next) {
        res.render('signup', {
            message: req.flash('message')
        });
    });

    router.post('/',function(req, res, next) {
      knex('users')
        .where('email',req.body.email)
        .first()
        .then((user)=>{
          if(user){
            //add err msg for users already exists
            return next(err)
          }
          User.createUser(req,res);
        })
        .catch(()=>{
          //user exists dummy
          res.redirect('/signup');
        })
    });

    function handleResponse(res, code, statusMsg) {
        res.status(code).json({
            status: statusMsg
        });
    };

module.exports = router;
