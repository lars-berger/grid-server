var jwt = require('jsonwebtoken');

const jWToken = async (ctx, next) => {
  ctx.jwt = {};
  ctx.jwt['modified'] = false;
  if (!ctx.request.headers.authorization ) return await next();
  if ( ctx.url !== '/auth/facebook'){
    if ( ctx.request.headers.authorization ){
      const auth = ctx.request.headers.authorization.split(' ');
      if (auth[0] !== 'Bearer') {
        await next();
      } else {
        let decoded = jwt.verify(auth[1], process.env.JWT_SECRET);
        ctx.user = {
          id: decoded.id
        };
        await next();
      }
    } else await next();
  } else await next()


  if (ctx.jwt.modified) {
    console.log(ctx.user)
    const token = jwt.sign({id:ctx.user}, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
    console.log(token)
    // ctx.set('x-token',token);
    if (!ctx.body) {
      ctx.body = {'jwt':token};
    } else {
      Object.assign(ctx.body, {'jwt':token});
    }
  }
};

module.exports = jWToken;