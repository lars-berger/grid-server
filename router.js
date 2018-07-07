'use strict';
const router = require('koa-router')();
const loginFTW = require(__dirname + '/controllers/loginftw');

const gridCont = require(__dirname + '/controllers/gridController')
const userCont = require(__dirname + '/controllers/userController')
const authorize = require(__dirname + '/middleware/auth');


// API: Tracking endpoints for dashboard
router
  .get('/auth/facebook', loginFTW.first )

  .get('/getUser', authorize, userCont.getUser)
  .get('/:id',gridCont.getGrid)
  .post('/saveGrid',authorize, gridCont.saveGrid);

module.exports = router;
