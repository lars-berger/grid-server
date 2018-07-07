const User = require(__dirname + '/../models/User');


module.exports.getUser = async (ctx, next) => {
  const user = await User.findOne({fbUserId: ctx.user.id})
  ctx.body = {user}
};