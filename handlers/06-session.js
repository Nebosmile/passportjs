// in-memory store by default (use the right module instead)
const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');

// sadfhawlufey49fawhfa, sid

/*
const sessions = {
  sadfhawlufey49fawhfa: { name: "Ivan", visitsCount: 1 }
};

if (ctx.cookie.sid && sessions[ctx.cookie.sid])
  ctx.session = sessions[ctx.cookie.sid];
*/
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  store: new MongooseStore({
      collection: 'appSessions',
      // connection: connection,
      expires: 86400, // 1 day is the default
      name: 'AppSession'
    }),
};

exports.init = app => app.use(session(CONFIG, app));
