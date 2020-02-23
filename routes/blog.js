// @ts-ignore
const router = require('koa-router')();
const query = require('../sql/query');

router.prefix('/blog')

router.get('/', function (ctx, next) {
  
  ctx.body = {
      a:1
  };
});

router.get('/index', async (ctx, next) => {
  let sqlContent = await query(`SELECT * FROM blogIndex`);

  if(sqlContent[0]!==null){
    // 成功
    ctx.body = {
      status: 'ok',
      data: sqlContent,
    };
  } else{
    ctx.body = {
      status: 'error',
      token: ''
    };
  }
});

router.get('/detail', async (ctx, next) => {
  let sqlContent = await query(`SELECT * FROM blogDetail`);
  // 处理blob数据
  let data = [];
  // sqlContent.forEach(item=>{
    // data.push(item.markdown)
  // })

  if(sqlContent[0]!==null){
    // 成功
    ctx.body = {
      status: 'ok',
      data: sqlContent
    };
  } else{
    ctx.body = {
      status: 'error',
      token: ''
    };
  }
});

router.post('/message', async (ctx, next) => {
  console.log(ctx.request.body);
  let sqlContent = await query(`INSERT INTO message(message) VALUES('${ctx.request.body.message}')`);
  console.log(sqlContent)
  if(sqlContent[0]!==null){
    // 成功
    ctx.body = {
      status: 'ok',
    };
  } else{
    ctx.body = {
      status: 'error',
    };
  }
});

module.exports = router