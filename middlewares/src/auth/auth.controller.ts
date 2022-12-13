import { Post, Req, Body, ValidationPipe, Res, Logger, Controller, UseFilters, UseInterceptors, Param, Get, Session, HttpException, HttpStatus, UseGuards, Put } from "@nestjs/common"
import { ApiCreatedResponse } from "@nestjs/swagger"
import { AppConfig } from "../core/config/app.config"

import { AppConstants } from "../core/constants/app.constants"
import { LoggerConstants } from "../core/constants/logger.constants"
import { UsersDTO } from "../core/dto/users.dto"
import { AuthService } from "./auth.service"
import {Request , Response } from "express"
import { LoginDTO } from "../core/dto/login.dto"
import { HttpExceptionFilter } from "../core/filters/http-exception.filter"
import { LoggingInterceptor } from "../core/interceptors/logging.interceptor"
import { AdminDTO } from "src/core/dto/admin.dto"
import { SuperAdminDTO } from "src/core/dto/superAdmin.dto"
import { RolesDecorator } from "src/core/decorator/roles.decorator"
import { AuthGuard } from "@nestjs/passport"

import { PermissionDTO } from "src/core/dto/updatePermissions.dto"
// import { TryService } from "./try.service"

@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())

@Controller(AppConfig.API_PREFIX_USERS)
export class AuthController {
private readonly logger = new Logger(AuthController.name)

constructor (private readonly authService : AuthService,
// private readonly t: TryService
){}


/**create super admin
 * 
 * @param information 
 * @param res 
 * @returns 
 */
@ApiCreatedResponse()    

@Post(AppConfig.SUPER_ADMIN_CREATION)
async createSuperAdmin( @Body(new ValidationPipe({ skipMissingProperties: false })) information : SuperAdminDTO) {
this.logger.log(LoggerConstants.SUPER_ADMIN_C)
let result = await this.authService.createSuperAdmin(information)
return AppConstants.SUPER_ADMIN_CREATION
}


/** create admin
 * 
 * @param information 
 * @returns 
 */


@ApiCreatedResponse() 
@RolesDecorator(AppConstants.SUPER_ADMIN)     
@Post(AppConfig.ADMIN_CREATION)
@UseGuards(AuthGuard())
async createAdmin( @Body(new ValidationPipe({ skipMissingProperties: false })) information : AdminDTO) {

this.logger.log(LoggerConstants.SUPER_ADMIN_C)
let result = await this.authService.createAdmin(information)
return AppConstants.ADMIN_CREATION


}
/**create user
 * 
 * @param information 
 * @param res 
 * @returns 
 */

@ApiCreatedResponse() 
    @RolesDecorator(AppConstants.ADMIN,AppConstants.SUPER_ADMIN)
@Post(AppConfig.USERS)
@UseGuards(AuthGuard())
async createUsers( @Body(new ValidationPipe({ skipMissingProperties: false })) information : UsersDTO) {
    this.logger.log(LoggerConstants.CREATE_USER_C)
    let result = await this.authService.createUser(information)
    return AppConstants.USER_CREATION
}

/**login
 * 
 * @param credentials 
 * @returns 
 */
@ApiCreatedResponse()
@Post(AppConfig.LOGIN)
async login (  @Body(new ValidationPipe({ skipMissingProperties: false })) credentials :LoginDTO ){
    this.logger.log(LoggerConstants.LOGIN_C)
    let result = await this.authService.login(credentials)
    return result   
}
/**update permission
 * 
 * @param id 
 * @param permissions 
 * @returns 
 */
@Put(AppConfig.UPDATE_PERMISSION)
@RolesDecorator(AppConstants.ADMIN,AppConstants.SUPER_ADMIN)
@UseGuards(AuthGuard())
async updatePermissions(@Param() id , @Body(new ValidationPipe({ skipMissingProperties: false })) permissions : PermissionDTO){
    this.logger.log(LoggerConstants.PERMISSION_UPDATE_C)
    await this.authService.updatePermisiions(id.id , permissions.permissions)
    return AppConstants.UPDATE_PERMISSION
}
/**update policy
 * 
 * @param id 
 * @param policy 
 * @returns 
 */
@Put(AppConfig.UPDATE_POLICY)
@RolesDecorator(AppConstants.SUPER_ADMIN)
@UseGuards(AuthGuard())
async updatePolicy(@Param() id , @Body(new ValidationPipe({ skipMissingProperties: false })) policy ){
    this.logger.log(LoggerConstants.POLICY_UPDATE_C)
    await this.authService.updatePolicies(id.id , policy.policy)
    return AppConstants.UPDATE_POLICY
}

/**sign up with google
 * 
 * @returns 
 */
@Get(AppConfig.GOOGLE_SIGNUP)
@UseGuards(AuthGuard(AppConstants.GOOGLE))
async googleAuth() {

return AppConstants.AUTHENTICATED
}

/**google login
 * 
 * @param req 
 * @returns 
 */
@Get(AppConfig.GOOGLE_LOGIN)
@UseGuards(AuthGuard(AppConstants.GOOGLE))
async googleRedirect(@Req() req ){


return this.authService.googleLogin(req.user)
}
 /**facebook sign up 
  * 
  * @returns 
  */   
@Get(AppConfig.FACEBOOK_SIGNUP)
@UseGuards(AuthGuard(AppConstants.FACEBOOK))
async facebookAuth() {

return AppConstants.AUTHENTICATED
}

/**facebook login
 * 
 * @param req 
 * @returns 
 */
@Get(AppConfig.GOOGLE_LOGIN)
@UseGuards(AuthGuard(AppConstants.GOOGLE))
async facebookRedirect(@Req() req ){
return this.authService.facebookLogin(req.user)
}

}