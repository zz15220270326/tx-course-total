const Router = require('koa-router');
const searchController = require('../../controllers/app/Search');

const router = new Router();

router.prefix('/app/search-page');

router.get('/get-hot-words', searchController.getSearchData);

module.exports = router;
