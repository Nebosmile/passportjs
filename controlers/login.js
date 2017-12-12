const UserSchema = require('../schemas/user');
const mongoose = require('mongoose');
var database= require('../config')
var db =  mongoose.connect(database.db,database.options);
const passport= require('koa-passport')
const fs = require('fs');

// console.log(db);



exports.post =  async function(ctx,next){

	await passport.authenticate('local', function(err, user, info, status) {
		if (err) ctx.throw(err);
        if (user) {
            ctx.login(user);
            ctx.body = {
                email: user.email,
                login: user.login,
                id: user._id,
            };

            return ctx;
        } else {
            if (info) {
                ctx.body = { status: 404, result: info };
            }
            return ctx;
        }

	})(ctx,next)
}
exports.access =  async function(ctx,next){

	var aut = await ctx.isAuthenticated()
	if(aut) {
		ctx.body = {
			type: 'access true',

		};
		return
	}
	else{
		ctx.body = {
			type: 'access false',

		};
	}
	// console.log(ctx.session);


}
exports.logout =  async function(ctx,next){

 	 await ctx.logout()
	 ctx.body = {
		 type: 'exit is true',

	 };

}
