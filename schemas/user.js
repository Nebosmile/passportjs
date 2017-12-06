const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);
const config = require('../config.js');
const crypto = require('crypto')

const user_schema = mongoose.Schema({
    name: {
        type: String,
        // unique: true
    },
	login:{
		type: String,
		unique: true,
		required:true
	},
    email:{
        type: String,
        // required:true
    },
	password_hash:{
		type:String,
		required:true

	},
	salt:{
		type:String,
		required:true
	}
})
user_schema.virtual('password')
	.set(function(password) {
		if(password!=undefined){
			if(password.length<4){
				this.invalidate('password',"Password must have 4 or more symbol")
			}
		}
		this._plainPassword = password;
		if(password){
			this.salt=crypto.randomBytes(config.hash.length).toString('base64');
			this.password_hash=crypto.pbkdf2Sync(
				password,
				this.salt,
				config.hash.iteration,
				config.hash.length,
				'sha512'
			).toString('base64')
			console.log(this.password_hash);
		}
	})
user_schema.methods.checkPassword=function (password) {
    if(!password) return false;
    if(!this.password_hash) return false;
    return crypto.pbkdf2Sync(
        password,
        this.salt,
        config.hash.iteration,
        config.hash.length,
        'sha512'
    ).toString('base64')==this.password_hash;

}


module.exports = mongoose.model("User_reg", user_schema);
