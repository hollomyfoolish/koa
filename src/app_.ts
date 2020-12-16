import debug from 'debug';
// debug.enable('koa-router');
import Koa from 'koa';
import KoaRouter from 'koa-router';

const port = 3003;
const app = new Koa();

const rout1 = new KoaRouter();
const rout2 = new KoaRouter();
const rout3 = new KoaRouter();
const rout4 = new KoaRouter();

rout4.all('/ping', ctx => { ctx.body = 'pong!' });

// rout1.all(/(?!\/login)^.*$/, async (ctx, next) => {
// rout1.all(/^.*$/, async (ctx, next) => {
//     console.log(`access: ${ctx.request.url}`);
//     return await next();
// });

rout1.use(async (ctx, next) => {
    console.log(`access: ${ctx.request.url}`);
    return next();
}).get('/login', ctx => {
    ctx.body = 'login';
});
rout2.get('/login', async (ctx, next) => {
    ctx.body = 'home2';
})

// rout3.use('/', rout1.routes());
// rout3.use('/', rout2.routes());
// app.use(async (ctx, next) => {
//     console.log(`access: ${ctx.request.url}`);
//     return next();
// });
// app.use(rout3.routes());

app.use(rout1.routes());
app.use(rout2.routes());

// app.use(rout2.routes());
// app.use(rout4.routes());

app.listen(port, () => {
    console.log(`server is on ${port}`);
})