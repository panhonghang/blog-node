const jwt = require('jsonwebtoken');
const serect = 'token';  //密钥，不能丢
module.exports = (userinfo) => {
  const token = jwt.sign({
    user: userinfo
  }, serect, {expiresIn: '1h'});
  return token;
};
