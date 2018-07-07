const User = require(__dirname + '/../models/User');
const Grids = require(__dirname + '/../models/Grids');


module.exports.getUser = async (ctx, next) => {
  const user = await User.findOne({fbUserId: ctx.user.id}).populate('grids');
  ctx.body = {user}
};