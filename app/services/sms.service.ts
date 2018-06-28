import * as SMSClient from "@alicloud/sms-sdk";
import { Environment } from "../../config/environments";

export const sendSMS =(phoneNumber,templateCode,templateParam)=>{
    const accessKeyId = Environment.aliyun.sms.accessKeyId
    const secretAccessKey = Environment.aliyun.sms.accessKeySecret

    let smsClient = new SMSClient({accessKeyId,secretAccessKey})

    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: Environment.aliyun.sms.signName,
        TemplateCode: templateCode,
        TemplateParam: templateParam
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
}