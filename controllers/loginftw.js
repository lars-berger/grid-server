const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');
const User = require(__dirname + '/../models/User');

module.exports.first = async (ctx,next) =>{
  console.log( ctx.headers)

  const token = ctx.headers.authorization.split('Bearer ')[1];
  const appsecretProof = CryptoJS.HmacSHA256(token, process.env.FBCLIENTSECRET).toString(CryptoJS.enc.Hex);
  const baseUrl = 'https://graph.facebook.com/me?fields=id,name,email,picture&access_token=';
  let response = await fetch(baseUrl+token+'&appsecret_proof='+appsecretProof);
  response = await response.json()
  if (response.hasOwnProperty('error')) {
    ctx.status(401).send(response.error.message);
    return next;
  }
  const user = await User.findOne({ fbUserId: response.id});
  if (!user){
    await User.create({displayName: response.name, fbUserId:  response.id});
  }
  ctx.jwt.modified = true;
  ctx.user = response.id;
  console.log(user)
  ctx.body={response}
};