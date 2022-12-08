import { Module, NestModule } from "@nestjs/common";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware/middleware-consumer.interface";
import {AuthModule} from  "./auth/auth.module"
import { BookModule } from "./books/book.module";
import { AppConfig } from "./core/config/app.config";
import { LoggerMiddleware } from "./core/middleware/loggerMiddleware";
var bodyParser = require('body-parser')
@Module({
  imports: [AuthModule,BookModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,bodyParser.json({type :String }))
      
      .forRoutes(AppConfig.API_PREFIX_USERS)
      
  }
}
