const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next) =>{
    ctx.response.status = 200;
    ctx.response.body = "hi koa"
    await next()
})

app.listen(8806)