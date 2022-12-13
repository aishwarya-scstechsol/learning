import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AppConstants } from "../constants/app.constants";
import { ExceptionConstants } from "../constants/exception.constants";
import { PermissionsGuard } from "../guards/permissions.guard";
import { RolesGuard } from "../guards/roles.guard";

import { LoggingInterceptor } from "../interceptors/logging.interceptor";

export function PermissionsDecorator( ...permissions ){
   
    return applyDecorators (
        UseInterceptors(LoggingInterceptor) ,
        SetMetadata(AppConstants.PERMISSIONS_NAME ,permissions),

        UseGuards(PermissionsGuard),
        ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: ExceptionConstants.UNAUTHORIZED }),
        
    )
}