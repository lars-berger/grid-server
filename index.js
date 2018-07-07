require('dotenv').config();
const koa = require('koa');
const logger = require('koa-logger');
const cors = require('kcors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const jwt = require(__dirname + '/middleware/jwt')


const app = module.exports = new koa();


const server = require('http').createServer(app.callback());
const io = app.context.io = require('./socket').start(server);


const errorHandler = require('./middleware/errorHandler');
const router = require('./router.js');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err));

app
  .use(logger())
  .use(jwt)
  .use(cors())
  .use(helmet())
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())


  server.listen(process.env.PORT || 3001, () => {
    console.log('listening on port', 3631)
  })
