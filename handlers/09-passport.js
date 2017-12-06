const passport = require('../libs/passport');

//   ctx.login(user)
//   ctx.logout()
//   ctx.isAuthenticated()
exports.init=(app)=>app.use(passport.initialize());
