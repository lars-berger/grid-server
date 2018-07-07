'use strict';
const router = require('koa-router')();
const passport = require(__dirname + '/services/auth');
const apiController = require('./controllers/api.controller');
const loginFTW = require('./controllers/loginftw')


// API: Tracking endpoints for dashboard
router
  .get('/auth/facebook', loginFTW.first );


module.exports = router;
