const router = require('koa-router')()
const multer = require('koa-multer')


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
    postAnswerSql,
    getHeadSql,
    addCommentNum,
    addVisitorNum
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
        querySql(addCommentNum(id));
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

router.get('/api/getTotal',async(ctx,next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await querySql(getHeadSql()).then((data)=>{
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
        querySql(addVisitorNum(id));
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

let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

let upload = multer({storage:storage})

router.post('/api/upload', upload.single('content_img'),async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.body = {
         isok:true,
         filename: 'http://localhost:8806/images/'+ ctx.req.file.filename   //这里待会儿要改
       }
 
 })

  

module.exports = router
