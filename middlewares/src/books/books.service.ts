
//imports from nestjs 
import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { randomBytes } from 'crypto';
import { async } from 'rxjs';
import { AppConfig } from '../core/config/app.config';
import { AppConstants } from '../core/constants/app.constants';
import { LoggerConstants } from '../core/constants/logger.constants';
import { BooksDAO } from '../core/dao/books.dao';
import { DecryptionHelper } from '../core/helper/decryption.helper';
import { KeyGenerationHelper } from "../core/helper/keyGeneration.helper";
import { EncryptionHelper } from '../core/helper/encryption.helper';
import {v4} from "uuid"
import { ExceptionConstants } from 'src/core/constants/exception.constants';



@Injectable()
export class BooksService {
    private readonly iv = randomBytes(16)

    private readonly logger = new Logger(BooksService.name)
    constructor(

        private readonly bookDAO: BooksDAO,
        private readonly encrypt : EncryptionHelper,
        private readonly decrypt :DecryptionHelper,
        private readonly keyGeneration : KeyGenerationHelper



    ) { }

    createBook = async (book, user,file) => {
        this.logger.log(LoggerConstants.CREATE_BOOK_S)
        
        // let status:Boolean
        // let result = await this.bookDAO.getBooks()
        // await result.forEach(async (element) => {
    
        //     let secretKey = await this.keyGeneration.generateKey(element.key)
        //     let decrypted = await this.decrypt.decrypt(element.information ,secretKey)
        //     let decryptedJSON = JSON.parse(decrypted)
        //     if (decryptedJSON.name === book.name){
        
        //       status  = true }
            
        // });
        





        let informationTOBeEncrypted = JSON.stringify(book)
        
        let key = v4()
      
        let secretKey = this.keyGeneration.generateKey(key)
        const encryptedText = await this.encrypt.encrypt( informationTOBeEncrypted,secretKey)
       
        return await this.bookDAO.createBook(encryptedText,user,key)
    }

    getBooks = async () => {
        this.logger.log(LoggerConstants.GET_BOOK_S)
        
    
let result = await this.bookDAO.getAllBooks()
let decryptedResult = []
result.forEach(async (element) => {
    
    let secretKey = await this.keyGeneration.generateKey(element.key)
    let decrypted = await this.decrypt.decrypt(element.information ,secretKey)
    let decryptedJSON = JSON.parse(decrypted)
    decryptedResult.push(decryptedJSON)

});

return decryptedResult
    }

    getBooksById = async (id) => {
        this.logger.log(LoggerConstants.GET_BOOK_C)
        return await this.bookDAO.getBookByID(id)
    }

    updateBook = async (book , id) => {
        this.logger.log(LoggerConstants.UPDATE_BOOK_S)
       await this.bookDAO.updateBookInfo(book , id )
       return AppConstants.UPDATED

    }

    deleteBook = async (id) => {
        this.logger.log(LoggerConstants.DELETE_BOOK_S)
         await this.bookDAO.deleteBook(id)
         return AppConstants.DELETED


    }

//     glogin =async(user) =>{
//         this.logger.verbose("hey in the service ")
// if(!user) {
//     return "no user from g"
// }
// let info =  {
//     message : 'User Info from google',
//     user : user 
// }

// return info
//     }
}
