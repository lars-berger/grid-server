'use strict';
const router = require('koa-router')();

const apiController = require('./controllers/api.controller');


// API: Tracking endpoints for dashboard
router
  .get('/login', apiController.fbLogin)


module.exports = router;
