const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


// 创建用户的Schema 
const userSchema = new Schema({
	UserId: ObjectId,
	UserName: {unique: true, type: String},
	password: String,
	createAt: {type: Date, default: Date.now()},
	lastLoginAt: {type: Date, default: Date.now()}
})


mongoose.model('User', userSchema)


// Schema: 一种以文件形式存储的数据库模型骨架，不具有数据库操作能力
// Model: 由Schema 发布生成的 模型， 具有抽象属性和数据库操作能力
// Entity: y由Model创建的实例，也能操作数据库

