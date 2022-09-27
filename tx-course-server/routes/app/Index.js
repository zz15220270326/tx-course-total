const indexController = require('../../controllers/app/Index');

const Router = require('koa-router');

const router = new Router();
router.prefix('/app/index-page');

router.get('/get-rc-list', indexController.getRcList);
router.get('/get-hot-list', indexController.getHotCateList);

module.exports = router;
