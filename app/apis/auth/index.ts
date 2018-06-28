import * as Router from 'koa-router';
import { AuthApi } from './auth.api';

export const auth = new Router()
    .post("/register",AuthApi.register)
    .post("/login",AuthApi.login)