import cryptPwd from '../cryptPwd/cryptPwd';
// @ts-ignore
const router = require('koa-router')();
const query = require('../sql/query');

router.prefix('/register')

router.post('/', function (ctx, next) {
  // let req = JSON.parse(ctx.request.body);

  // only postman task
  let req = ctx.request.body;


  let status = query(`INSERT INTO user (username , password) VALUES (${req.username},${req.password}) `);
  ctx.body = status;
})

module.exports = router
