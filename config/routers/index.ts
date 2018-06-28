import * as Router from 'koa-router';
import { home } from '../../app/apis/home/index';
import { auth } from '../../app/apis/auth';

const router = new Router()

export default router
    .use('/api/v1',home.routes(),home.allowedMethods())
    .use('/api/v1',auth.routes(),auth.allowedMethods())