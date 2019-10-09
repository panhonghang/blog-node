const router = require('koa-router')()

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '47.100.167.231',
  user     : 'root',
  password : '9872014skylove',
  database : 'blog'
});
 
connection.connect();
let a;
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  a = results;
  console.log('The solution is: ', results);
});

router.prefix('/login')

router.get('/', function (ctx, next) {
  ctx.body = {
		status: true,
		type: a
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
