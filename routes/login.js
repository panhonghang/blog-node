const router = require('koa-router')()
var NodeRSA = require('node-rsa')
const fs = require('fs');

// const mysql      = require('mysql');
// const connection = mysql.createConnection({
//   host     : '47.100.167.231',
//   user     : 'root',
//   password : '9872014skylove',
//   database : 'blog'
// });
 
// connection.connect();
// let a;
// connection.query('SELECT * FROM user', function (error, results, fields) {
//   if (error) throw error;
//   a = results;
//   console.log('The solution is: ', results[0].password);
// });

router.prefix('/login');

// router.post('/', function (ctx, next) {

//   var keyValue = JSON.parse(ctx.request.body).value;
 

//   console.log('iput', decrypted);
//   console.log('decrypted: ', encrypted);

//   ctx.body = keyValue;
// })

// 返回private
router.get('/publicKey', async (ctx, next) => {
  function generator() {
    var key = new NodeRSA({ b: 512 })
    key.setOptions({ encryptionScheme: 'pkcs1' })
  
    var privatePem = key.exportKey('pkcs1-private-pem')
    var publicPem = key.exportKey('pkcs1-public-pem')
  
    fs.writeFileSync('routes/pem/public.pem', publicPem, (err) => {
      if (err) throw err
      console.log('公钥已保存！',publicPem)
    })
    fs.writeFileSync('routes/pem/private.pem', privatePem, (err) => {
      if (err) throw err
      console.log('私钥已保存！',privatePem)
    })
  }
  
  function encrypt() {

    fs.readFileSync('./pem/private.pem', function (err, data) {
      var key = new NodeRSA(data);
      // let cipherText = key.encryptPrivate('hello world', 'base64');
      // ctx.body = {a:key};
      res = key;
      console.log('加密',key);
    });
  }

  encrypt();
  ctx.body = {a:res};

});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
