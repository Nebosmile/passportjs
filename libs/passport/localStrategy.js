let passport = require('koa-passport');
let LocalStrategy = require('passport-local');
let User = require('../../schemas/user.js');

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
    usernameField: 'login', // 'username' by default
    passwordField: 'password',
    passReqToCallback: true // req for more complex cases
  },
  // Три возможных итога функции
  // done(null, user[, info]) ->
  //   strategy.success(user, info)
  // done(null, false[, info]) ->
  //   strategy.fail(info)
  // done(err) ->
  //   strategy.error(err)

  // TODO: rewrite this, use async/await
  function(req, login, password, done) {
    User.findOne({ login }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        // don't say whether the user exists
        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    });
  }
));
