const UserSchema = require('../schemas/user');
const mongoose = require('mongoose');
var database = require('../config')
var db = mongoose.connect(database.db, database.options);
const passport = require('koa-passport')
const fs = require('fs');
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
// console.log(db);
const jwtsecret = require('../config.js').jwtsecret

exports.post = async function(ctx, next) {

	await passport.authenticate('local', {
		session: false
	}, function(err, user, info, status) {
		if (err)
			ctx.throw(err);
		if (user) {

			const payload = {
				email: user.email,
				login: user.login,
				id: user._id
			};

			// ctx.login(user);

			const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
			ctx.body = {
				user: payload,
				token: token
			};

			// return ctx;
		} else {
			if (info) {
				ctx.body = {
					status: 404,
					result: info
				};
			}
			// return ctx;
		}

	})(ctx, next)
}
exports.access = async function(ctx, next) {

	var aut = await ctx.isAuthenticated()
	if (aut) {
		ctx.body = {
			type: 'access true'
		};
		return
	} else {
		ctx.body = {
			type: 'access false'
		};
	}
	// console.log(ctx.session);

}
exports.logout = async function(ctx, next) {

	await ctx.logout()
	ctx.session = null; 
	ctx.body = {
		type: 'exit is true'
	};

}
// exports.custom = async (ctx, next)=> {
// 	await passport.authenticate('jwt', {session: false})(ctx, next);
//     console.log(ctx.state.user);
//
// 	if (!ctx.state.user) {
// 	  ctx.status = 400;
// 	  ctx.body = {error: 'invalid credentials'};
// 	  return;
// 	}
//
// 	ctx.status = 200;
// 	ctx.body = {
// 	  private: 'top most secret info',
// 	  email: ctx.state.user.email
// 	};
// }
exports.custom = async(ctx, next) => {
	await passport.authenticate('jwt', function(err, user) {
		if (user) {
			ctx.body = {hello:'sum user with mail '+user.email};
		} else {
			ctx.body = "No such user";
			console.log("err", err)
		}
	})(ctx, next)
}
