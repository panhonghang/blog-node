// @ts-ignore
const router = require('koa-router')()
const NodeRSA = require('node-rsa');

const key = new NodeRSA({b: 1024});
const addtoken = require('../token/addtoken');
const query = require('../sql/query');
const cryptPwd = require('../cryptPwd/cryptPwd');

// 查看 https://github.com/rzcoder/node-rsa/issues/91
key.setOptions({encryptionScheme: 'pkcs1'}); // 必须加上，加密方式问题。

router.prefix('/login');

router.get('/publicKey', async (ctx, next) => {
  // 获取公私钥
  let publicDer = key.exportKey('public');

  ctx.body = publicDer;
});

router.post('/decryption', async (ctx, next) => {
  // 对加密数据进行解密
  let obj = JSON.parse(ctx.request.body);
  // 转数字
  let userName = +obj.username;

  let password = cryptPwd(key.decrypt(obj.password, 'utf8'));

  let sqlContent = await query(`SELECT * FROM user WHERE username = ${userName}`);

  if(sqlContent[0].password===password){
    // 成功
    ctx.body = {
      status: 'ok',
      token: addtoken(JSON.parse(ctx.request.body))
    };
  } else{
    ctx.body = {
      status: 'error',
      token: ''
    };
  }

  // ctx.cookies.set({token:token})
});

module.exports = router
