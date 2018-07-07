const FB = require('fb');
const authService = require('../services/auth.service')

module.exports.fbLogin = async ctx => {
  FB.api('/me', async response => {
    if (!response || res.error) {
      console.log(!response ? 'error occurred' : res.error);
      return;
    }
    try {
      let user = {};
      if (response.userID) {
        user = await User.findOne({'fbUserId': response.userID});
      }

      if (!user) {
        user = await User.insertOne({
          username: response.name,
          fbUserId: response.userID,
        });
      }

      const token = await authService().issue({
        id: user.id,
        type: 'USER',
      });

      ctx.body = {
        token,
        user
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, 'Internal server error')
    }

    ctx.throw(400, 'you didnt log in')
  });
};
