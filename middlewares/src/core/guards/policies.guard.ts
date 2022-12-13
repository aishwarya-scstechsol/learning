import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

//this import is made to acess methods in jsonwebtoken 
import * as jwt from 'jsonwebtoken'
import { AppConstants } from "../constants/app.constants";
import { LoggerConstants } from "../constants/logger.constants";
@Injectable()
export class PoliciesGuard implements CanActivate{
    private readonly logger = new Logger (PoliciesGuard.name)
    constructor(private reflector :Reflector ){}

    
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       try{
        this.logger.log(LoggerConstants.GUARD_POLICIES)
        const policies = this.reflector.get<String[]>('policies',context.getHandler())
      

        
        if (!policies) {
           
            return true;
          }
          
          const request = context.switchToHttp().getRequest();
          const user = request.user
        
          let reuslt =  this.matchRoles(policies , user.policies)
         return reuslt
            }
        
        catch(e){
            this.logger.error(LoggerConstants.GUARD_ERR)
            throw new UnauthorizedException()
        }
    }
    matchRoles(policies,requestedPolicies){
        
        let result  =false 
        policies.forEach(element => {
            requestedPolicies.forEach(policy => {
                
                if(element ===policy)
               
                result = true
            });
           
        
        });

return result 
        
    }
    
}