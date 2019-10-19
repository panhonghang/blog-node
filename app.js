const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
var cors = require('koa2-cors')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const register = require('./routes/register');
const login = require('./routes/login')
const page = require('./routes/page')

// 解决跨域问题
app.use(cors({
  origin: function (ctx) {
      // 允许所有域名请求
      return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
 
  const start = new Date()
  await next()
  // @ts-ignore
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// @ts-ignore
app.use(login.routes(), login.allowedMethods())
// @ts-ignore
app.use(register.routes(), register.allowedMethods())

app.use(page.routes(), page.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
