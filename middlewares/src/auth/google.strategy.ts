import { PassportStrategy } from "@nestjs/passport";

import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {Strategy , VerifyCallback} from  "passport-google-oauth20"
import { DBConfig } from "src/core/config/db.config";
import { UserDAO } from "src/core/dao/users.dao";
import { AppConstants } from "src/core/constants/app.constants";
import { AppConfig } from "src/core/config/app.config";
import { LoggerConstants } from "src/core/constants/logger.constants";
 
@Injectable()
export class GoogleStratrgy extends PassportStrategy(Strategy , AppConstants.GOOGLE) {
    private readonly logger =  new Logger(GoogleStratrgy.name)
     constructor(@Inject(DBConfig.USERS_MODEL) private readonly userModel , private userDAO : UserDAO){
        super( {
            clientID : AppConfig.GOOGLE_CLIENT_ID,
            clientSecret : AppConfig.GOOGLE_CLIENT_SECRET,
            callbackURL : AppConfig.GOOGLE_CALLBACK,
            scope : [AppConstants.EMAIL ,AppConstants.PROFILE]

        })
     }

     validate =async(accessToken : string , refreshToken :string ,profile , done :VerifyCallback)=>{
        try{
const {displayName , emails,photos} = profile

this.logger.log(LoggerConstants.VALIDATING_PAYLOAD)
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
          this.logger.error(LoggerConstants.VALIDATING_PAYLOAD_ERR)
            throw new UnauthorizedException()
        }
     }
}