const router = require('koa-router')()

const {
    postArticleSql,
    querySql,
    getTotalSql
} = require('../sql')

const {
    saveHtml
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

  
module.exports = router
