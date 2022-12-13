import { Inject, Injectable, Logger } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { EncryptionHelper } from "../core/helper/encryption.helper";

import { promisify } from "util";

import { LoggerConstants } from "../core/constants/logger.constants";
import { UserDAO } from "../core/dao/users.dao";
import { PasswordCompare } from "../core/helper/passwordCompare.helper";
import { PasswordHasher } from "../core/helper/passwordHasher.helper";
import { Tokengeneration } from "../core/helper/tokenGeneration.helper";
import { DecryptionHelper } from "../core/helper/decryption.helper";
import { async } from "rxjs";
import { AppConfig } from "../core/config/app.config";
import { AppConstants } from "src/core/constants/app.constants";


@Injectable()

export class  AuthService{
    private readonly iv = randomBytes(16)
    private readonly logger = new Logger(AuthService.name)
    constructor(
       
        private readonly user: UserDAO,
        private readonly passwordHash : PasswordHasher,
        private readonly TokenGeneration : Tokengeneration,
      
       
        private readonly PasswordHash : PasswordHasher  ,
        private readonly PasswordCompare : PasswordCompare,
        private readonly encrypt : EncryptionHelper
        ,
        private readonly decrypt : DecryptionHelper,
        
        
        
        
    ) { }
    
/**create super admin
 * 
 * @param userInformation 
 * @returns 
 */
createSuperAdmin = async (userInformation ) =>{
    
    this.logger.log(LoggerConstants.SUPER_ADMIN_S)
    let password = await this.passwordHash.hashPassword(userInformation.password)
    await this.user.userExists(userInformation.emailID)
    await this.user.superAdminCheck(userInformation.role)
    return await this.user.createSuperAdmin(userInformation,password)
    }
    
/**create super admin
 * 
 * @param userInformation 
 * @returns 
 */
createAdmin = async (userInformation ) =>{
    
    this.logger.log(LoggerConstants.ADMIN_S)
    let password = await this.passwordHash.hashPassword(userInformation.password)
    await this.user.userExists(userInformation.emailID)
    return await this.user.createAdmin(userInformation,password)
    }



/**create user
 * 
 * @param userInformation 
 * @returns 
 */
createUser = async (userInformation ) =>{
    
    this.logger.log(LoggerConstants.CREATE_USER_S)
    let password = await this.passwordHash.hashPassword(userInformation.password)
    await this.user.userExists(userInformation.emailID)
   
    return await this.user.createUser(userInformation,password)

    }


login = async(credentials)=>{
    this.logger.log(LoggerConstants.LOGIN_S)
    let user = await this.user.user(credentials.emailID)
    let match : Boolean = await this.PasswordCompare.comparePassword(credentials.password ,user.password )
    if(match) {
    let token = await this.TokenGeneration.generateToken(user._id ,user.role)
    return {"token" : token}
}              

}


async updatePermisiions(id ,permissions){
    this.logger.log(LoggerConstants.PERMISSION_UPDATE_S)
    return await this.user.updatePermissions(id ,permissions)
    
}

async updatePolicies(id ,policy)
{
    this.logger.log(LoggerConstants.POLICY_UPDATE_S)
    return await this.user.updatePolicy(id , policy)
}

googleLogin = async  (user)=>{
    if (user){    

        let result = await this.TokenGeneration.generateToken(user.user._id ,user.user.role)
        
    return { token : result}
 }
}
 facebookLogin = async  (user)=>{
    if (user){    

        let result = await this.TokenGeneration.generateToken(user.user._id ,user.user.role)
        
    return { token : result}
 }



 }

}