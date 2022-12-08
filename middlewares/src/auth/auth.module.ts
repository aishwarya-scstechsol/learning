import { forwardRef, Module, OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppConstants } from "../core/constants/app.constants";
import { CoreModule } from "../core/core.module";
import { modelProviders } from "../db/model-Provider/model.provider";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
// import { TryService } from "./try.service";

@Module({
    imports : [CoreModule,PassportModule.register({defaultStrategy :AppConstants.JWT}),JwtModule.register({secret :AppConstants.SECRET_KEY ,signOptions :{expiresIn : AppConstants.EXPIRES_IN}})],
    controllers : [AuthController],
    providers : [AuthService,JwtStrategy,...modelProviders,
        // TryService
    ],
    exports : [JwtStrategy,PassportModule]
})
export class AuthModule implements OnModuleInit{
    onModuleInit() {
        
    }

}