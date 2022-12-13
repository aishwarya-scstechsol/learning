import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

//this import is made to acess methods in jsonwebtoken 
import * as jwt from 'jsonwebtoken'
import { AppConstants } from "../constants/app.constants";
import { LoggerConstants } from "../constants/logger.constants";
@Injectable()
export class PermissionsGuard implements CanActivate{
    private readonly logger = new Logger (PermissionsGuard.name)
    constructor(private reflector :Reflector ){}

    
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       try{
        this.logger.log(LoggerConstants.GUARD_P)
        const permission = this.reflector.get<String[]>('permissions',context.getHandler())
      

        
        if (!permission) {
           
            return true;
          }
          
          const request = context.switchToHttp().getRequest();
          const user = request.user
        
          let reuslt =  this.matchRoles(permission , user.permissions)
         return reuslt
            }
        
        catch(e){
            this.logger.error(LoggerConstants.GUARD_ERR)
            throw new UnauthorizedException()
        }
    }
    matchRoles(permissions,requestedPermisiions){
        let result  =false 
        permissions.forEach(element => {
            if(element ===requestedPermisiions)
        result = true
        
        });

return result 
        
    }
    
}