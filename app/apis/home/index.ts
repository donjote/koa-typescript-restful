import * as Router from "koa-router";
import { HomeApi } from './home.api';
import { authenticated } from '../../services/auth.service';

export const home = new Router()
    .get('/1',authenticated(),HomeApi.home)