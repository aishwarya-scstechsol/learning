import { createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
const AesEncryption = require('aes-encryption')
export class DecryptionHelper{
    decrypt= async(encryptedText,key) =>{
        
      const aes = new AesEncryption()
      aes.setSecretKey(key)
      
      const decrypted = aes.decrypt(encryptedText)
      
      return decrypted
    }
}