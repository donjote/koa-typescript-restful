import { Entity, Column, Index } from "typeorm";
import { AbstractEntity } from './base.entity';

@Entity()
export class User extends AbstractEntity {
    /** 手机号码 */
    @Column()
    @Index({unique:true})
    mobile:string;

    @Column()
    password:string;

    @Column()
    salt:string;
}

/** 账号类别 */
export enum IdentityType{
    /** 手机号码 */
    Mobile=1,
    /** 电子邮箱 */
    Email,
    /** 用户名 */
    UserName,
    /** QQ */
    QQ,
    /** 微博 */
    Weibo,
    /** 微信 */
    Wechat
}