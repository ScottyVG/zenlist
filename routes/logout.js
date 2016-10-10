'use strict';

var express = require('express');
var router = express.Router();
var User = require('../middleware/auth')

  router.get('/',(req,res,next)=>{
    console.log('log out fired');
    req.logout();
    res.redirect('/')
  })

module.exports = router;
