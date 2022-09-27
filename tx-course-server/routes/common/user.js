const Router = require('koa-router');

const userController = require('../../controllers/common/User');

const router = new Router();

router.prefix('/user');

router.get('/get-user-info', userController.getUserInfo);

module.exports = router;
