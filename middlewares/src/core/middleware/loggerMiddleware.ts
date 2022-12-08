import { Logger } from "@nestjs/common";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger (LoggerMiddleware.name)
    use(req: any, res: any, next: (error?: any) => void) {
        this.logger.log("The request has been made at " + Date.now())
        this.logger.log ("Request Type : " + req.method +  "  Path : " + req.path)
        next()
    }

}





