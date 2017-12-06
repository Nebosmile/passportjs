const UserSchema = require('../schemas/user');
const mongoose = require('mongoose');
var database= require('../config')
var db =  mongoose.connect(database.db,database.options);
const passport= require('koa-passport')
const fs = require('fs');

// console.log(db);



exports.post =  async function(ctx,next){

	await passport.authenticate('local', function(err, user, info, status) {
	    if (user === false) {
	      ctx.body = { success: false }
	      ctx.throw(401)
	    } else {
	      ctx.body = { success: true }
	      return ctx.login(user)
	    }
	})(ctx,next)
}
