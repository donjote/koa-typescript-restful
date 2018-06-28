import * as Koa from 'koa';
import { isNullOrUndefined, isString, isNull } from 'util';
import { User } from '../../entity/user.entity';
import { makeSalt, encryptPassword } from '../../services/password.service';
import { getManager, Index } from 'typeorm';
import { signToken } from '../../services/auth.service';

export const AuthApi ={
    async register(ctx:Koa.Context):Promise<void>{
        const { mobile,password} = ctx.request.body

        if(isNullOrUndefined(mobile) || mobile.length ==0){
           return ctx.unprocessableEntity("手机号码不能为空")
        }

        if(isNullOrUndefined(password) || password.length == 0){
            return ctx.unprocessableEntity("密码不能为空")
        }

        let user = await getManager().findOne(User,{mobile:mobile})

        if(!isNull(user)){
            return ctx.conflict("手机号码已存在")
        }

        user = new User()
        user.mobile = mobile
        user.salt = makeSalt()
        user.password=encryptPassword(password,user.salt)
        
        await getManager().save(user)
            .then(user=>{
                user.salt=undefined
                user.password = undefined
                ctx.created(user)
            }).catch(err=>{
                if(err.errno == 1062){
                    return ctx.conflict("手机号码已存在")
                }else{
                    return ctx.badRequest()
                }
            })
    },

    async login(ctx:Koa.Context):Promise<void>{
        
        const { mobile,password} = ctx.request.body

        if(isNullOrUndefined(mobile) || mobile.length ==0){
           return ctx.unprocessableEntity("手机号码不能为空")
        }

        if(isNullOrUndefined(password) || password.length == 0){
            return ctx.unprocessableEntity("密码不能为空")
        }

        let user = await getManager().findOne(User,{mobile:mobile})

        if(user!=null && encryptPassword(password,user.salt) == user.password){
            return ctx.created(signToken(user.id))
        }else{
            return ctx.unauthorized("用户名或密码错误")
        }
    }
}