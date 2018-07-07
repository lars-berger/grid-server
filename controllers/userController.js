const User = require(__dirname + '/../models/User');
const Grids = require(__dirname + '/../models/Grids');


module.exports.getUser = async (ctx, next) => {
  const user = await User.findOne({fbUserId: ctx.user.id},{ _id:0}).select('displayName fbUserId grids').populate({path:'grids',select:'-_id -videos._id'});
  ctx.body = {user}
};