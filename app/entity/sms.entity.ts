import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './base.entity';

@Entity()
export class Sms extends AbstractEntity {
    /** 手机号码 */
    @Column()
    mobile:string;

    /** 短信内容 */
    @Column()
    message:string;

    /** 短信类别 */
    @Column()
    type:SmsType;
}

export enum SmsType{
    /** 注册 */
    Register=1,
    /** 登录 */
    Login,
    /** 找回密码 */
    Retrieve_Password
}