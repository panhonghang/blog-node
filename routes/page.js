// @ts-ignore
const router = require('koa-router')();

router.prefix('/page')

router.get('/', function (ctx, next) {
  ctx.body = {
      a:1
  };
})

module.exports = router