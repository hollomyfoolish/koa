import debug from 'debug';
debug.enable('koa-redis');
import { default as cluster } from 'cluster';
import Koa from 'koa';
import koaMount from "koa-mount"; 
import cls, { Namespace } from 'cls-hooked';
// import auth from './auth';
// import oAuth from './oAuth';
// import home from './home';
import session from 'koa-session';
import simplestore from './session-store';
import redisStore from 'koa-redis';
import * as filters from './mw/filters';
import * as services from './mw/services';

let store = null;
if(cluster.isWorker){
  store = redisStore({});
}else{
  store = simplestore;
}

const requestCtx: Namespace = cls.createNamespace('app-request-context');

const app = new Koa();
app.keys = ['terces'];
app.use(session({
  store: store
}, app)).use(async (ctx, next) => {
  return await requestCtx.runAndReturn(async () => {
   try{
    requestCtx.set('uid', new String(Math.random()).substring(2));
    return await next();
   }catch(e){
     console.log(e);
    ctx.status = 500;
    ctx.body = `something bad happened: ${e.message || e}`;
   }
  });
});

for(let name in filters){
  app.use(filters[name]);
}
for(let name in services){
  app.use(services[name].routes());
}

// const homeApp = new Koa();
// homeApp.use(home.routes());

// app.use(auth.routes());
// app.use(oAuth.routes());
// app.use(koaMount("/", homeApp));

  // .use(oAuth.allowedMethods());
  // .use(home.allowedMethods());
app.listen(30000, () => {
  console.log(`App[${process.pid}] runing in port: 30000`);
});