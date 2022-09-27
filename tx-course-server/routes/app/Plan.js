const Router = require('koa-router');

const planController = require('../../controllers/app/Plan');

const router = new Router();

router.prefix('/app/plan-page');

router.get('/get-top-info', planController.getPlanTimeInfo);
router.get('/get-course-progress-info', planController.getCourseProgressInfo);

module.exports = router;
