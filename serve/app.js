const koa = require('koa')
const app = new koa()
const route = require('./routes')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')


// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(require('koa-static')(__dirname + '/public'))


// routes
app.use(route.routes(), route.allowedMethods())

app.use(cors())

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });


app.listen(8806)