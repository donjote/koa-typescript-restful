import * as compose from 'koa-compose';
import * as Koa from 'koa';
import * as Koajwt from 'koa-jwt';
import { Environment } from '../../config/environments';
import * as jsonwebtoke from 'jsonwebtoken';

/** 验证token */
export const authToken = ()=>{

    return compose([
        async (ctx:Koa.Context,next)=>{
            if(ctx.query && ctx.query.access_token){
                ctx.headers.authorization = 'Bearer ' + ctx.query.access_token
            }
            await next()
        },

        
        Koajwt({secret:Environment.jwt.secret,passthrough:true})
    ])
}

/** 验证用户是否登录 */
export const authenticated = ()=>{
    return compose([
        authToken(),
        async (ctx:Koa.Context,next)=>{
            if(!ctx.state.user) ctx.unauthorized('未授权')
            await next()
        },
        async (ctx:Koa.Context,next)=>{
            await next()
        }
    ])
}

/** 验证用户权限 */
export const hasRole = async (roleRequired)=>{
    if(!roleRequired)  this.throw('需要设置角色')

    return compose([
        authenticated(),
        async (ctx:Koa.Context,next)=>{
            if(Environment.userRoles.indexOf(ctx.state.user.role) >= Environment.userRoles.indexOf(roleRequired)){
                await next()
            }else{
                ctx.forbidden()
            }
        }
    ])
}

/** 生成token */
export const signToken = async (user_id)=>{
    return jsonwebtoke.sign({user_id:user_id},Environment.jwt.secret,{expiresIn:Environment.jwt.expiresIn})
}

/** 获取当前用户ID */
export const currentUserId = async (ctx:Koa.Context)=>{
    return ctx.state.user.user_id
}

/** 获取当前用户 */
export const currentUser = async (ctx:Koa.Context)=>{
    return ctx.state.user.user_id
}