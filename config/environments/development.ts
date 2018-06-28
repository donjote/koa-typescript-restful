export default{
    identity: 'development',

    port: 3000,

    jwt: {
        secret: 'tate-restful-dev',
        expiresIn: '30d'
    },
    
    orm: {
        host: '192.168.99.100',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'tate',
        synchronize: true,
        logging: true,
        entities: [
            'app/entity/*.ts'
        ],
    },

    // 用户角色种类
    userRoles:['user', 'admin'],

    aliyun:{
        sms:{
            accessKeyId: 'AccessKeyId',
            accessKeySecret: 'AccessKeySecret',
            signName: '云通信产品',
            
        },
    },
}