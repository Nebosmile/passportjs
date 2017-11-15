const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');


const base_controller = require('./controlers/index');



router.get('/',base_controller.get_index)


router.post('/',base_controller.post_index)



module.exports= router;
