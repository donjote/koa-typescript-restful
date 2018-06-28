import { createServer } from './config/application';
import { Server } from 'http';
import { Environment } from './config/environments';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Sms } from './app/entity/sms.entity';

module.exports = (async()=>{

    createConnection({
        type:"mysql",
        host: Environment.orm.host,
        port: Environment.orm.port,
        username: Environment.orm.username,
        password: Environment.orm.password,
        database: Environment.orm.database,
        synchronize: Environment.orm.synchronize,
        logging: Environment.orm.logging,
        entities: Environment.orm.entities
    }).then(async connection=>{
        try {
            const app = await createServer()
            const server: Server = app.listen(Environment.port, () => {
                console.log(`Server listening on ${Environment.port}, in ${Environment.identity} mode.`)
              })
            
            return server
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }).catch(error=>console.log("TypeORM connection error:",error))
})()