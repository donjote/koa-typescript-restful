import * as crypto from "crypto";

export const makeSalt = ()=>{
    return crypto.randomBytes(64).toString('base64')
}

export const encryptPassword =(password,salt)=>{
    if (!password || !salt) return ''

    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
}