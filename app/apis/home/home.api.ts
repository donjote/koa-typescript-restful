import { Context } from "koa";
import { currentUserId } from "../../services/auth.service";
import { User } from '../../entity/user.entity';
import { getManager, getConnection, getRepository } from "typeorm";

export const HomeApi ={
    async home(ctx:Context):Promise<void>{

        // const user = new User()
        // user.mobile ="13112345678"
        // user.password="123456"
        // user.salt="122"

        // await getManager().save(user)

        // console.log(getConnection()
        //     .createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values({mobile:"13212345678",password:"123",salt:"111"})
        //     .getSql())


        let user = await getManager().findOne(User,"14a6bcfd-a8b0-479b-a797-a7ae18f6ccfe")
        // let user = new User()
        user.salt ="222222"
        user.password="6666666666666"

    
        // await user.save()

        await getManager().save(user)

        // console.log(getConnection()
        //     .createQueryBuilder()
        //     .update(User)
        //     .set({salt:"111"})
        //     .where("id>:id",{id:"1111"})
        //     .getSql()
        // )

        // await getConnection()
        //     .createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values({mobile:"13212345678",password:"123",salt:"111"})
        //     .execute()
        
        ctx.ok({text: await currentUserId(ctx)})
    }
}