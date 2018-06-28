import * as Koa from 'koa';

export const Jwt  = () => async(ctx: Koa.Context, next) => {
    return await next().catch((err)=>{
        if(err.status === 401){
            ctx.unauthorized("未授权")
        }else{
            ctx.serverError()
        }
    })
}