import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppConstants } from 'src/core/constants/app.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AppConstants.LOCAL) {}