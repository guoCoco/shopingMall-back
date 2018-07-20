const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const { connect, initSchemas } = require('./db/init')
let user = require('./appApi/User')
let router = new Router()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
router.use('/user', user.routes())
// app.use(async(ctx)=>{
//     ctx.body = '<h1>hello Koa2</h1>'
// })

;(async () => {
	await connect()
	initSchemas()
	const User = mongoose.model('User')
	// let oneUser = new User({UserName: 'guokeke4', password: '123456'})
	// oneUser.save().then(()=>{
 //        console.log('插入成功')
 //    })
 //    let users = await User.findOne({}).exec()
 //    console.log('----------------')
 //    console.log(users)
})()

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
