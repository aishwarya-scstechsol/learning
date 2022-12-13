import { PassportStrategy } from "@nestjs/passport";

import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {Strategy , VerifyCallback} from "passport-facebook"
import { DBConfig } from "src/core/config/db.config";
import { UserDAO } from "src/core/dao/users.dao";
import { AppConfig } from "src/core/config/app.config";
import { AppConstants } from "src/core/constants/app.constants";
import { LoggerConstants } from "src/core/constants/logger.constants";
 
@Injectable()
export class FacebookStratrgy extends PassportStrategy(Strategy ,AppConstants.FACEBOOK) {
    private readonly logger =  new Logger(FacebookStratrgy.name)
     constructor(@Inject(DBConfig.USERS_MODEL) private readonly userModel , private userDAO : UserDAO){
        super( {
            clientID : AppConfig.FACEBOOK_CLIENT_ID,
            clientSecret : AppConfig.FACEBOOK_CLIENT_SECRET,
            callbackURL : AppConfig.FACEBOOK_CALLBACK,
            scope : [AppConstants.EMAIL ,AppConstants.SCOPE]

        })
     }

     validate =async(accessToken : string , refreshToken :string ,profile , done :VerifyCallback)=>{
        try{
            this.logger.log(LoggerConstants.VALIDATING_PAYLOAD)
const {displayName , emails} = profile


let emailID = emails[0].value


let user =  await this.userModel.findOne({emailID : emailID})
if(user) {
    user ={
        user : user ,
        token : accessToken
    }
    return user 
}


await this.userDAO.userExists(emailID)
user = await this.userDAO.createUserG(displayName , emailID)
user = {
    user : user ,
        token : accessToken
}

done(null ,user)
        }
        catch(e) {
            this.logger.log(LoggerConstants.VALIDATING_PAYLOAD_ERR)
            throw new UnauthorizedException()
        }
     }
}