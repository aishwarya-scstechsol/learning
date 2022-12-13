//these imports are made for HttpExceptions handling and logging purpose 
import { Logger, Inject, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { async } from "rxjs";
//Database configuration imports
import { DBConfig } from "../config/db.config";
import { AppConstants } from "../constants/app.constants";
import { Permissions, Policies, Roles } from "../constants/enum.constants";
//import of constants for exception handling 
import { ExceptionConstants } from "../constants/exception.constants";
//imports of constants for logging
import { LoggerConstants } from "../constants/logger.constants";
import { MongoException } from "../exceptions/mongoDbExceptions";
//Interface that the AccountDAO implements
import { IUserDAO } from "../interface/dao.interface/users.interface.dao";

export class UserDAO implements IUserDAO {
    private readonly logger = new Logger(UserDAO.name);

    constructor(@Inject(DBConfig.USERS_MODEL) private UsersModel, 
      
    ) { }
   
   /**create super admin
    * 
    * @param UserInformation 
    * @param password 
    * @returns 
    */

    createSuperAdmin = async (UserInformation, password) => {
        try{
            this.logger.log(LoggerConstants.CREATE_SUPER_ADMIN)
            
        
                let user = await this.UsersModel.create({
                   name : UserInformation.name ,
                   emailID : UserInformation.emailID ,
                    password :password,
                    role : UserInformation.role,
                    permissions : Permissions.WRITE,
                    policies : Policies.ALL
                    
                    
                })
                return user
            }
            catch(e) {
        
        throw new MongoException(e.message)
            }
    }
/**create user
 * 
 * @param UserInformation 
 * @param password 
 * @param profilePicture 
 * @returns 
 */
    createUser = async (UserInformation, password) => {
try{
    this.logger.log(LoggerConstants.CREATE_USER)
    

        let user = await this.UsersModel.create({
           name : UserInformation.name ,
           emailID : UserInformation.emailID ,
            password :password,
            role : UserInformation.role,
            permissions : Permissions.READ,
            policies : ""
            
            
        })
        return user
    }
    catch(e) {

throw new MongoException(e.message)
    }

        

       
    }
    
/**create admin
 * 
 * @param UserInformation 
 * @param password 
 * @returns 
 */
    createAdmin = async (UserInformation, password) => {
        try{
            this.logger.log(LoggerConstants.CREATE_USER)
            
        
                let user = await this.UsersModel.create({
                   name : UserInformation.name ,
                   emailID : UserInformation.emailID ,
                    password :password,
                    role : UserInformation.role,
                    permissions : Permissions.WRITE,
                    policies : Policies.ALL
                    
                    
                    
                })
                return user
            }
            catch(e) {
        
        throw new MongoException(e.message)
            }}

userExists = async(emailID)=>{

    this.logger.log(LoggerConstants.USER_EXISTS)
    let user = await this.UsersModel.find()
   
user.forEach(element => {

    if(element.emailID=== emailID){

        throw new BadRequestException(ExceptionConstants.USER_EXISTS)
    }
 });

}
superAdminCheck = async(role) =>{
    try{
        this.logger.log(LoggerConstants.SUPER_ADMIN)
        let count = await this.UsersModel.count({role : Roles.SUPER_ADMIN})
        if(count >= 1) {
            throw new HttpException(ExceptionConstants.SUPER_ADMIN , HttpStatus.BAD_REQUEST)
        }

    }
    catch(e) {
        this.logger.error(LoggerConstants.SUPER_ADMIN_ERR)
        throw new HttpException(ExceptionConstants.SUPER_ADMIN , HttpStatus.BAD_REQUEST)
    }
}
user = async(emailID)=>{
    try{
        let user
        this.logger.log(LoggerConstants.USER_EXISTS)
let users = await this.UsersModel.find({emailID :emailID})

if(users.length===0){
    this.logger.error(LoggerConstants.USER_EXISTS_ERR)
        throw new HttpException(ExceptionConstants.USER_NOT_FOUND,HttpStatus.BAD_REQUEST)
}
users.forEach(element => {

user = element
});
return user
    }
    catch(e){
       
        this.logger.error(LoggerConstants.USER_EXISTS_ERR)
        throw new HttpException(ExceptionConstants.USER_NOT_FOUND,HttpStatus.BAD_REQUEST)
    }
}
boom = async (name) =>{
    return name
}

allUsers = async()=>{
    try{
    return await this.UsersModel.find()
    }catch(e) {
        throw new HttpException (ExceptionConstants.NO_RECORD_FOUND ,HttpStatus.NOT_FOUND)
    }
}


async updatePermissions(id , permissions){
    try{
    this.logger.log(LoggerConstants.PERMISSION_UPDATE)
    let result = await this.UsersModel.updateOne({_id : id} ,{$set : {permissions : permissions}})
    return result
    }
    catch(e){
        this.logger.error(LoggerConstants.PERMISSION_UPDATE_ERR)
        
        throw new HttpException (ExceptionConstants.COULDNOT_UPDATE ,HttpStatus.BAD_REQUEST)
    }
}


async updatePolicy (id , policy )
{
    try{
       
        this.logger.log(LoggerConstants.POLICY_UPDATE)
        return await this.UsersModel.updateOne({_id : id} ,{$push : {policies : policy }})
    }
    catch(e) {
        this.logger.error(LoggerConstants.POLICY_UPDATE_ERR)
        
        throw new HttpException (ExceptionConstants.COULDNOT_UPDATE_POLICY ,HttpStatus.BAD_REQUEST)
    }
}


createUserG = async(name , emailID) =>{
   
        try{
            this.logger.log(LoggerConstants.CREATE_USER)
            
        
                let user = await this.UsersModel.create({
                    name : name ,
                   emailID : emailID ,
                   
                    role : Roles.USER,
                    permissions : Permissions.READ,
                    policies : ""
                    
                    
                })
                return user
            }
            catch(e) {
        
        throw new MongoException(e.message)
            }
}


findUser= async (id) =>{
const user = await this.UsersModel.find({_id :id})
return user 
}
}