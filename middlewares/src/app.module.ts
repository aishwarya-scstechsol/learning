import { Module, NestModule } from "@nestjs/common";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware/middleware-consumer.interface";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import {AuthModule} from  "./auth/auth.module"
import { BookModule } from "./books/book.module";
import { AppConfig } from "./core/config/app.config";
import { LoggerMiddleware } from "./core/middleware/loggerMiddleware";

var bodyParser = require('body-parser')
@Module({
  imports: [AuthModule,BookModule,
  //   ServeStaticModule.forRoot({
  //   rootPath: join(__dirname, '..', 'files'),
  // }),
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,
        // ServeStaticMiddleware
        bodyParser.json({type :String }))
      
      .forRoutes(AppConfig.API_PREFIX_USERS)
      
  }
}
