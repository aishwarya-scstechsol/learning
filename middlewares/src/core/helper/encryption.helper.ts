
const AesEncryption = require('aes-encryption')

export class EncryptionHelper {
  encrypt = async (text,key) =>{
    
const aes = new AesEncryption()
aes.setSecretKey(key)

    const encrypted = aes.encrypt(text)
    const decrypted = aes.decrypt(encrypted)
   
    return encrypted
  }
}