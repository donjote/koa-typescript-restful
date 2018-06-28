import * as Koa from 'koa';
import * as kcors from 'kcors'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import router from './routers';
import { Rest } from './middleware/rest';

export const createServer = async():Promise<any> =>{
    return new Koa()
        .use(kcors())
        .use(Rest())
        .use(bodyParser())
        .use(logger())
        .use(router.routes())
        .use(router.allowedMethods())
        
}