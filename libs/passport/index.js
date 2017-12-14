const passport = require('koa-passport');
const User = require('../../schemas/user');

require('./serialize');

require('./localStrategy');
require('./jwtStrategy.js');

module.exports = passport;
