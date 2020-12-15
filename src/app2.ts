import Koa from 'koa';
import Router from 'koa-router';

const middlewareRouter = new Router();
const routerPage1 = new Router({
//   prefix: '/page1'
})
// .get('/list/:id', async (ctx, next) => {
//     console.log('trigger middleware')
//     ctx.body = `hi there.`
//     await next()
//   });;

const routerPage2 = new Router({

//   prefix: '/page1'

});

// middlewareRouter.get('/list/:id', async (ctx, next) => {
middlewareRouter.get(/.*/, async (ctx, next) => {
  console.log('trigger middleware')
  ctx.body = `hi there.`
  await next()
});

routerPage1.use(middlewareRouter.routes());
routerPage2.use(middlewareRouter.routes());

const app = new Koa();
app.use(middlewareRouter.routes());
app.use(routerPage1.routes());
app.use(routerPage2.routes());

app.listen(3004, () => {
    console.log('server on 3004');
})