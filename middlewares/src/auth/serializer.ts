import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserDAO } from "src/core/dao/users.dao";
@Injectable()
export class Serializer extends PassportSerializer{

    constructor(private userDAO : UserDAO) {
        super()

    }
    serializeUser(user: any, done: Function) {

        done(null ,user)
    }
    deserializeUser(payload: any, done: Function) {

        let user = this.userDAO.findUser(payload.id)
        return user ? done(null ,user ) : done(null ,null)

    }
    
}