import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common"

export class MongoException extends BadRequestException{
    constructor(e ){
        super(e) 
    }
}