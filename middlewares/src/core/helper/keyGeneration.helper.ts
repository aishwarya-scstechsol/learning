import { HttpException, HttpStatus, Logger } from "@nestjs/common"
import { ExceptionConstants } from "../constants/exception.constants"
import { LoggerConstants } from "../constants/logger.constants"

export class KeyGenerationHelper {
    private readonly logger = new Logger (KeyGenerationHelper.name)
    generateKey = (key) =>{
        try{
this.logger.log(LoggerConstants.KEY_GEN)
const buf = Buffer.from(key, 'utf8');
    let secretKeyForEncryption =  buf.toString('hex');
    
    secretKeyForEncryption = secretKeyForEncryption.substring(0,64)
            return secretKeyForEncryption
    
}
catch(e){

    this.logger.log(LoggerConstants.KEY_GEN_ERR)
    
    throw new HttpException (ExceptionConstants.KEY ,HttpStatus.FAILED_DEPENDENCY)
}

}}
