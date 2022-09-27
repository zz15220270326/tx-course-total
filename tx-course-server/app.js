const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/common/user');

const appIndexRoutes = require('./routes/app/Index');
const appCateRoutes = require('./routes/app/Cate');
const appPlanRoutes = require('./routes/app/Plan');
const appSearchRoutes = require('./routes/app/Search');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(indexRoutes.routes(), indexRoutes.allowedMethods());
// common-routes
app.use(userRoutes.routes(), userRoutes.allowedMethods());
// app-routes
app.use(appIndexRoutes.routes(), appIndexRoutes.allowedMethods());
app.use(appCateRoutes.routes(), appCateRoutes.allowedMethods());
app.use(appPlanRoutes.routes(), appPlanRoutes.allowedMethods());
app.use(appSearchRoutes.routes(), appSearchRoutes.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
