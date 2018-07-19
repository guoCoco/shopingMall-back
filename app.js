const Koa = require('koa')
const app = new Koa()
const { connect } = require('./db/init')
 
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

;(async () => {
	await connect()
})()

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})