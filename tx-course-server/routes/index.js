const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
