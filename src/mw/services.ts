import koaRouter from 'koa-router';
import { AuthorizationCode } from 'simple-oauth2';
import oAtuthClientCfg from '../clientCfg';

const client = new AuthorizationCode(oAtuthClientCfg);

const oAuthClient = new koaRouter().get('/code', async ctx => {
    try {
        const tokenParams = {
            code: ctx.query.code,
            redirect_uri: 'http://localhost:30000/code',
            scope: 'openid',
        };
        const accessToken = await client.getToken(tokenParams);
        ctx['session']['token'] = accessToken.token;
        ctx.response.redirect('/home');
    } catch (error) {
        console.log('Access Token Error', error.message);
        ctx.status = 400;
        ctx.body = 'get auth code from UAA Error: ' + error.message;
    }
}).get('/login', (ctx, next) => {
    let authorizationUri = client.authorizeURL({
        redirect_uri: 'http://localhost:30000/code',
        scope: 'openid',
        state: 'fromTcTest'
    });
    ctx.response.redirect(authorizationUri);
});

const home = new koaRouter().get('/home', async ctx => {
    ctx.body = 'Welcome: ' + ctx['session']['token'].access_token;
});

export {oAuthClient, home};