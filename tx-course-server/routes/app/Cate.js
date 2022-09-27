const Router = require('koa-router');
const cateController = require('../../controllers/app/Cate');

const router = new Router();

router.prefix('/app/cate-page');

router.get('/', cateController.getCateList);
router.get('/get-course-cate', cateController.getCourseCate);

module.exports = router;
