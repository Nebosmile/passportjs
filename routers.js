const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');


const base_controller = require('./controlers/index');
const user_controller = require('./controlers/user');



router.get('/',base_controller.get_index)


router.post('/',base_controller.post_index);
router.post('/2s',base_controller.post_index2s);
router.post('/user/registration',user_controller.registr);
router.post('/user/login',user_controller.login);
// router.post('/user/login',user_controller.login)
// router.post('/user/found',user_controller.found)


module.exports= router;
