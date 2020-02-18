const router = require('koa-router')()

const {
    postArticleSql,
    querySql,
    getTotalSql,
    getDetailSql
} = require('../sql')

const {
    saveHtml,        
    spaceAdd
  } = require('../util')

router.post('/api/postArticle', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {title, content, type,kind} = ctx.request.body
    await querySql(postArticleSql(title, saveHtml(content), type,kind)).then((data) => {
      ctx.body = data
    })
  })

router.get('/api/getLife',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let type = ctx.query.type
    await querySql(getTotalSql(type)).then((data)=>{
        ctx.body = data
    })

})

router.get('/api/getBlog',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let type = ctx.query.type
    await querySql(getTotalSql(type)).then((data)=>{
        ctx.body = data
    })

})

router.get('/api/getDetail',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.query.id
    await querySql(getDetailSql(id)).then((data)=>{
        ctx.body = spaceAdd(data)
    })

})

  
module.exports = router
