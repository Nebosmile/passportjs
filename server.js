const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config.js');
var db =  mongoose.connect(config.db,config.options);
mongoose.Promise=Promise;


var app = new Koa();
app.use(async (ctx, next) => {
  // in the future we'll extend this
  ctx.set('Access-Control-Allow-Origin', '*');

  await next();
});

const handlers = fs.readdirSync('./handlers').sort();
handlers.forEach((handler)=>require('./handlers/'+ handler).init(app));



// console.log(handlers);
app.use(require('./routers').routes());


app.listen(config.port)
