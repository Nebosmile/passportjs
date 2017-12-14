let passport = require('koa-passport');
let JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt
let User = require('../../schemas/user.js');

// const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwtsecret = require('../../config.js').jwtsecret

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function(payload, done) {
	console.log(payload);
	User.findById(payload.id, function(err, user) {
		if (err) {
			return done(err, false);
		}

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	})
}));
