import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './core/middleware/loggerMiddleware';
import * as compression from "compression"
import * as session from "express-session"
import * as  errorhandler from 'errorhandler'
import * as morgan from "morgan"
import { AppConstants } from './core/constants/app.constants';
import  { join } from 'path';
import * as fs from "fs"
import * as passport from "passport"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  
  app.use(morgan('combined',{stream :  fs.createWriteStream("LOGS")}))
  app.use(errorhandler())
  app.use(compression())
  app.use(
    session({
secret : AppConstants.SECRET_KEY,
resave : false ,
saveUninitialized: false,
    })

  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);




  
}
bootstrap();
