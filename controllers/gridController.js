const uuidv4 = require('uuid/v4');
const User = require(__dirname + '/../models/User');
const Grid = require(__dirname + '/../models/Grids');


module.exports.saveGrid = async (ctx,next) => {
  let uuid;
  do {
    uuid = uuidv4();
    exist = await Grid.findOne({linkURL: uuid})
  } while(exist);

  const gridToPush = {
    name: ctx.request.body.name,
    videos: ctx.request.body.videos,
    linkURL: uuid
  };
  const grid = await Grid.create({name: ctx.request.body.name, videos: ctx.request.body.videos,URL: uuid})
  const user = await User.update(
    { fbUserId: ctx.user.id },
    { $push: { grids: grid._id} }
);
  ctx.body={grid}
};