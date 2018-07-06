require('dotenv').config();
const koa = require('koa');
const logger = require('koa-logger');
const cors = require('kcors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const app = module.exports = new koa();


const server = require('http').createServer(app.callback());
const io = app.context.io = require('./socket').start(server);

// probably not necessary, try out just doing ctx.io.socket instead
// io.on('connection', (socket) => {
//   app.context.clisock = socket;
// });

const errorHandler = require('./middleware/errorHandler');
const router = require('./router.js');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err));

app
  .use(logger())
  .use(cors())
  .use(helmet())
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())


  server.listen(process.env.PORT || 3001, () => {
    console.log('listening on port', 3001)
  })
