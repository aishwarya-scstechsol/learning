import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Permissions, Roles } from "../constants/enum.constants";
import { Document } from "mongoose";
@Schema()
export class User extends Document {
    
    @Prop()
    name : string 

    @Prop({unique : [true , "email email email"]})
    emailID :string 

    @Prop()
    password : string 

    @Prop({enum : Roles, default : Roles.USER })
    role : Roles

    @Prop()
    information : Buffer

    @Prop()
    createdAt : Date

    @Prop()
    updatedAt :Date

    @Prop()
    userInformation : String

    @Prop()
    permissions : string 

    @Prop()
    policies : [String]


}

export const UsersSchema = SchemaFactory.createForClass(User)