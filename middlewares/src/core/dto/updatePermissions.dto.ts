//import of injectable to mark this class as a provider 
import { Injectable } from "@nestjs/common";
//import of ApiProperty from swagger to make these properties visible to swagger module 
import { ApiProperty } from "@nestjs/swagger";
//import of IsNotEmpty that makes sure that the entity isnt empty and IsString that checks if the entity is a string from class-validator to validate the entity 
import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator";
import { AppConstants } from "../constants/app.constants";
import { Permissions } from "../constants/enum.constants";

@Injectable()
export class PermissionDTO {

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum( [Permissions.READ ,Permissions.WRITE] ,{message : AppConstants.PERMISSIONS})
    permissions : string 

  

}