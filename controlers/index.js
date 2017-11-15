const BaseSchema = require('../schemas/index');
const mongoose = require('mongoose');
var database= require('../config')
var db =  mongoose.connect(database.db,database.options);
const fs = require('fs');

// console.log(db);
mongoose.Promise=Promise;

module.exports={
    async get_index(ctx){
        ctx.type ='html';
        ctx.body = fs.createReadStream('public/builds.html')
    },
    async post_index(ctx){
        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = {"ansver":"post request worked"}
    }
}
