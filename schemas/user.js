const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);
const config = require('../config.js');

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
	password_hash:{
		type:String,
		required:true

	},
	salt:{
		type:String,
		required:true
	}
})
user_schema.virtual('password'){
	.set(function(password) {
		if(password!=undefined){
			if(password.length<4){
				this.invalidate('password',"Password must have 4 or more symbol")
			}
		}
		this._plainPassword = password;
		if(password){
			this.salt=crypto.randomBytes(config.hash.length);
			this.password_hash=crypto.pdkdf2Sync(
				password,
				this.salt,
				config.hash.iteration,
				config.hash.length,
				'sha512'
			)
			console.log(this.password_hash);
		}
	})
}

module.exports = mongoose.model("UserSchema", user_schema);
