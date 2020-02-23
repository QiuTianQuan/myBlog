const router = require('koa-router')()

const {
    postArticleSql,
    querySql,
    getTotalSql,
    getDetailSql,
    getLastIdSql,
    getNextIdSql,
    postCommentSql,
    getCommentsSql,
    getAnswersSql,
    postAnswerSql
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

router.post('/api/postComment', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id,comment,email,nickname} = ctx.request.body
    await querySql(postCommentSql(id,saveHtml(comment), email,nickname)).then((data) => {
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

router.get('/api/getLastId',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.query.id
    await querySql(getLastIdSql(id)).then((data)=>{
        ctx.body = spaceAdd(data)
    })
})

router.get('/api/getNextId',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.query.id
    await querySql(getNextIdSql(id)).then((data)=>{
        ctx.body = spaceAdd(data)
    })
})

router.get('/api/getComments',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.query.id
    await querySql(getCommentsSql(id)).then((data)=>{
        ctx.body = spaceAdd(data)
    })
})

router.get('/api/getAnswers',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.query.id
    await querySql(getAnswersSql(id)).then((data)=>{
        ctx.body = spaceAdd(data)
    })
})

router.post('/api/postAnswer', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {a_id,c_id,comment,email,nickname} = ctx.request.body
    await querySql(postAnswerSql(a_id,c_id,saveHtml(comment), email,nickname)).then((data) => {
        ctx.body = data
    })
})

router.post('/api/postComment', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id,comment,email,nickname} = ctx.request.body
    await querySql(postCommentSql(id,saveHtml(comment), email,nickname)).then((data) => {
        ctx.body = data
    })
})

  

module.exports = router
