//these imports are made for HttpExceptions handling and logging purpose 
import { Logger, Inject, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
//Database configuration imports
import { DBConfig } from "../config/db.config";
import { AppConstants } from "../constants/app.constants";
//import of constants for exception handling 
import { ExceptionConstants } from "../constants/exception.constants";
//imports of constants for logging
import { LoggerConstants } from "../constants/logger.constants";
//Interface that the AccountDAO implements
import { IUserDAO } from "../interface/dao.interface/users.interface.dao";

export class UserDAO implements IUserDAO {
    private readonly logger = new Logger(UserDAO.name);

    constructor(@Inject(DBConfig.USERS_MODEL) private UsersModel, 
      
    ) { }
   
   


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
            userInformation : UserInformation,
            password :password,
            
        })
        return user
    }
    catch(e) {
this.logger.error(LoggerConstants.USER_EXISTS_ERR)
console.log(e)
throw new HttpException(ExceptionConstants.USER_EXISTS , HttpStatus.CONFLICT)
    }

        

       
    }

userExists = async(emailID)=>{

    this.logger.log(LoggerConstants.USER_EXISTS)
    let user = await this.UsersModel.find()
    
    console.log(user)
user.forEach(element => {

    if(element.emailID=== emailID){
        throw new BadRequestException(ExceptionConstants.USER_EXISTS)
    }
 });

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
}