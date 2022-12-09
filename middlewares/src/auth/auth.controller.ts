import { Post, Req, Body, ValidationPipe, Res, Logger, Controller, UseFilters, UseInterceptors, Param, Get, Session } from "@nestjs/common"
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
// import { TryService } from "./try.service"

@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller(AppConfig.API_PREFIX_USERS)
export class AuthController {
private readonly logger = new Logger(AuthController.name)

constructor (private readonly authService : AuthService,
    // private readonly t: TryService
    ){}
    /**create admin
         * 
         * @param information 
         * @param res 
         * @returns 
         */
     @ApiCreatedResponse()
        
     @Post()
     
     async createUsers( @Body(new ValidationPipe({ skipMissingProperties: false })) information : UsersDTO) {
        
         this.logger.log(LoggerConstants.CREATE_USER_C)
         let result = await this.authService.createUser(information)
         return AppConstants.USER_CREATION
      
 
     }


     @ApiCreatedResponse()
        @Post(AppConfig.LOGIN)
       
        async login (  @Body(new ValidationPipe({ skipMissingProperties: false })) credentials :LoginDTO , 
        
        ){
            this.logger.log(LoggerConstants.LOGIN_C)
           
            let result = await this.authService.login(credentials)
            return result
           
            
        }


        @Get('/files')
        async getUserInformation(@Res() res )
        {
            // this.logger.log(LoggerConstants.GET_STATIC_FILE)
            // res.sendFile("files/userInformation.txt",{root : "files/userInformation.txt"})
        }
        
        @Get ( '/compression') 
        async getResult (@Res() res,@Session()session )
{
    this.logger.log(LoggerConstants.GET_STATIC_FILE)
    
    session.visits = session.visits ? session.visits + 1 : 1;

    // console.log(session)
    res.send("middlewares /.".repeat(200000))

}


//         @Post('/boom')
//         async boomFn(@Body() body) {
//             logger.log
// return await this.t.method1(body.name)
//         }
}