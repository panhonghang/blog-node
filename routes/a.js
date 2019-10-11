var NodeRSA = require('node-rsa')
var fs = require('fs')

function generator() {
  var key = new NodeRSA({ b: 512 })
  key.setOptions({ encryptionScheme: 'pkcs1' })

  var privatePem = key.exportKey('pkcs1-private-pem')
  var publicPem = key.exportKey('pkcs1-public-pem')

  fs.writeFile('./pem/public.pem', publicPem, (err) => {
    if (err) throw err
    console.log('公钥已保存！',publicPem)
  })
  fs.writeFile('./pem/private.pem', privatePem, (err) => {
    if (err) throw err
    console.log('私钥已保存！',privatePem)
  })
}

function encrypt() {
    fs.readFile('./pem/private.pem', function (err, data) {
      var key = new NodeRSA(data);
      let cipherText = key.encryptPrivate('hello world', 'base64');
      console.log('加密',cipherText);
    });
  }
  
  function decrypt() {
    fs.readFile('./pem/public.pem', function (err, data) {
      var key = new NodeRSA(data);
      let rawText = key.decryptPublic("XMdL8LEThTmPXY/5BaH84p241iMtFIMRXw3C1fGuN09ebKWbNASPA/3N5hs5z3qBGKhuQh9srZAur3NSRifcwA==", 'utf8');
      console.log('解密',rawText);
    });
  }
  
  generator();
  encrypt();
//   decrypt();