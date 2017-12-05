const passport = require('koa-passport');
const User = require('../../schemas/user');

require('./serialize');

require('./localStrategy');

module.exports = passport;
