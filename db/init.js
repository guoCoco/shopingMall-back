const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const db = "mongodb://localhost/shopping-db"

mongoose.Promise = global.Promise

exports.initSchemas = () => { // 引入所有 的 Scheme
	glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
	// 连接数据库
	mongoose.connect(db)

	return new Promise((resolve, reject) => {
		//增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***********数据库断开***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)    
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
            
        })
 
        mongoose.connection.on('error',err=>{
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)   
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
 
        })
        //链接打开的时
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully') 
            resolve()   
        })
	})
}

// const db = 'mongodb://localhost/dbname'

// console.log(() => { // 引入所有 的 Scheme
// 	glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(require)
// })