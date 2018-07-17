'use strict';
const router = require('koa-router')();
const loginFTW = require(__dirname + '/controllers/loginftw');

const gridCont = require(__dirname + '/controllers/gridController')
const userCont = require(__dirname + '/controllers/userController')
const authorize = require(__dirname + '/middleware/auth');


// API: Tracking endpoints for dashboard
router
  .get('/auth/facebook', loginFTW.first )
  .get('/getGrid/:id',gridCont.getGrid)
  .get('/popular', gridCont.popular)

  .get('/getUser', authorize, userCont.getUser)
  .delete('/deleteGrid',authorize, gridCont.deleteGrid)
  .post('/saveGrid',authorize, gridCont.saveGrid);

module.exports = router;
